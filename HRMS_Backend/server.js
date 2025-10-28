// --- Imports ---
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct official import
import { jsonrepair } from "jsonrepair";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// --- Config ---
dotenv.config();
const app = express();
const port = 3001;
const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ Correct initialization

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Multer setup for PDF upload ---
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

// --- Utility: Extract text from PDF ---
async function extractTextFromPDF(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n";
  }
  return text.trim();
}

// =====================================================
// 🧑‍💼 AUTHENTICATION MIDDLEWARE & ENDPOINTS
// =====================================================

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        employeeId: true,
        name: true,
        role: true,
        department: true,
        joinDate: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({ error: "Token expired" });
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ error: "Invalid token" });

    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
};

// --- Register ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, department, employeeId, role = "HR" } = req.body;

    if (!email || !password || !name || !employeeId)
      return res.status(400).json({ error: "Missing required fields" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, employeeId, password: hashedPassword, name, department, role },
    });

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({
        error: `User with this ${
          error.meta.target.includes("email") ? "email" : "employee ID"
        } already exists.`,
      });
    } else {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed due to an unexpected error." });
    }
  }
});

// --- Login ---
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required." });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed due to an unexpected error." });
  }
});

// --- Me ---
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const userProfile = {
    ...req.user,
    joinDate: new Date(req.user.joinDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  res.json(userProfile);
});

// =====================================================
// 💼 JOB MANAGEMENT ENDPOINTS
// =====================================================

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({ orderBy: { datePosted: "desc" } });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/api/jobs", authMiddleware, async (req, res) => {
  try {
    const { title, department, openings, jobDescription, requirements } = req.body;
    const newJob = await prisma.job.create({
      data: {
        title,
        department,
        openings: parseInt(openings, 10),
        jobDescription,
        requirements,
        postedById: req.user.id,
      },
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

app.put("/api/jobs/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job status" });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const archivedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { status: "ARCHIVED" },
    });
    res.json(archivedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to archive job" });
  }
});

// =====================================================
// 📄 DOCUMENT MANAGEMENT ENDPOINTS
// =====================================================

// --- Get all documents ---
app.get("/api/documents", authMiddleware, async (req, res) => {
  try {
    const { category, search, sortBy = "updatedAt", sortOrder = "desc" } = req.query;
    
    const where = {};
    if (category && category !== "all") {
      where.category = { name: category };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    const documents = await prisma.document.findMany({
      where,
      include: {
        category: true,
        uploadedBy: {
          select: { id: true, name: true, email: true }
        },
        favorites: {
          where: { userId: req.user.id },
          select: { id: true }
        },
        downloads: {
          where: { userId: req.user.id },
          select: { id: true }
        },
        _count: {
          select: {
            favorites: true,
            downloads: true
          }
        }
      },
      orderBy: { [sortBy]: sortOrder }
    });

    // Add computed fields
    const documentsWithMeta = documents.map(doc => ({
      ...doc,
      isFavorited: doc.favorites.length > 0,
      isDownloaded: doc.downloads.length > 0,
      favoriteCount: doc._count.favorites,
      downloadCount: doc._count.downloads
    }));

    res.json(documentsWithMeta);
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// --- Get document categories ---
app.get("/api/documents/categories", authMiddleware, async (req, res) => {
  try {
    const categories = await prisma.documentCategory.findMany({
      include: {
        _count: {
          select: { documents: true }
        }
      },
      orderBy: { name: "asc" }
    });
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// --- Get single document ---
app.get("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        uploadedBy: {
          select: { id: true, name: true, email: true }
        },
        favorites: {
          where: { userId: req.user.id },
          select: { id: true }
        },
        downloads: {
          where: { userId: req.user.id },
          select: { id: true }
        }
      }
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      ...document,
      isFavorited: document.favorites.length > 0,
      isDownloaded: document.downloads.length > 0
    });
  } catch (error) {
    console.error("Get document error:", error);
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

// --- Create document ---
app.post("/api/documents", authMiddleware, async (req, res) => {
  try {
    const { title, description, categoryId, type, format, size, filePath, tags } = req.body;
    
    if (!title || !categoryId || !type || !format) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        categoryId: parseInt(categoryId),
        type,
        format,
        size: size || 0,
        filePath: filePath || "",
        tags: tags || [],
        uploadedById: req.user.id
      },
      include: {
        category: true,
        uploadedBy: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Create document error:", error);
    res.status(500).json({ error: "Failed to create document" });
  }
});

// --- Update document ---
app.put("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, tags } = req.body;
    
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) }
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Check if user can edit (owner or admin/hr)
    if (document.uploadedById !== req.user.id && !["ADMIN", "HR"].includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized to edit this document" });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        tags
      },
      include: {
        category: true,
        uploadedBy: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(updatedDocument);
  } catch (error) {
    console.error("Update document error:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
});

// --- Delete document ---
app.delete("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) }
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Check if user can delete (owner or admin/hr)
    if (document.uploadedById !== req.user.id && !["ADMIN", "HR"].includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized to delete this document" });
    }

    await prisma.document.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete document error:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
});

// --- Toggle favorite ---
app.post("/api/documents/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const documentId = parseInt(id);
    
    const existingFavorite = await prisma.documentFavorite.findUnique({
      where: {
        userId_documentId: {
          userId: req.user.id,
          documentId
        }
      }
    });

    if (existingFavorite) {
      // Remove favorite
      await prisma.documentFavorite.delete({
        where: { id: existingFavorite.id }
      });
      res.json({ isFavorited: false, message: "Removed from favorites" });
    } else {
      // Add favorite
      await prisma.documentFavorite.create({
        data: {
          userId: req.user.id,
          documentId
        }
      });
      res.json({ isFavorited: true, message: "Added to favorites" });
    }
  } catch (error) {
    console.error("Toggle favorite error:", error);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
});

// --- Record download ---
app.post("/api/documents/:id/download", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const documentId = parseInt(id);
    
    // Record the download
    await prisma.documentDownload.create({
      data: {
        userId: req.user.id,
        documentId
      }
    });

    res.json({ message: "Download recorded" });
  } catch (error) {
    console.error("Record download error:", error);
    res.status(500).json({ error: "Failed to record download" });
  }
});

// --- Get user's favorites ---
app.get("/api/documents/favorites", authMiddleware, async (req, res) => {
  try {
    const favorites = await prisma.documentFavorite.findMany({
      where: { userId: req.user.id },
      include: {
        document: {
          include: {
            category: true,
            uploadedBy: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const documents = favorites.map(fav => ({
      ...fav.document,
      isFavorited: true
    }));

    res.json(documents);
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// =====================================================
// 📊 DASHBOARD STATS
// =====================================================
app.get("/api/dashboard-stats", async (req, res) => {
  try {
    const activeJobs = await prisma.job.count({ where: { status: "OPEN" } });
    const newCandidates = await prisma.candidate.count({ where: { status: "NEW" } });

    const hired = await prisma.candidate.findMany({
      where: { status: "HIRED", dateHired: { not: null } },
    });

    let avgTimeToHire = 0;
    if (hired.length > 0) {
      const totalDays = hired.reduce((acc, c) => {
        const diff = Math.abs(new Date(c.dateHired) - new Date(c.dateApplied));
        return acc + diff / (1000 * 60 * 60 * 24);
      }, 0);
      avgTimeToHire = Math.round(totalDays / hired.length);
    }

    res.json({
      activeJobs,
      newCandidates,
      avgTimeToHire: `${avgTimeToHire} days`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// =====================================================
// 🤖 AI ENDPOINTS (Gemini + JSON Repair)
// =====================================================

// --- Generate JD ---
app.post("/api/ai/generate-jd", async (req, res) => {
  try {
    const { title, department, keywords } = req.body;
    if (!title || !department || !Array.isArray(keywords))
      return res.status(400).json({ error: "Invalid or missing fields" });

    const prompt = `
      Write a professional, inclusive, and engaging job description for "${title}" in the "${department}" department.
      Include the following keywords: ${keywords.join(", ")}.
      Structure it as:
      1. Job Summary
      2. Responsibilities
      3. Qualifications
      4. Benefits
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Correct API
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ text });
  } catch (err) {
    console.error("AI JD Generation Error:", err);
    res.status(500).json({ error: "Failed to generate job description" });
  }
});

// --- Screen Resume ---
app.post("/api/ai/screen-resume-pdf", upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No resume uploaded" });
    if (!jobDescription) return res.status(400).json({ error: "Job description required" });

    const resumeText = await extractTextFromPDF(file.buffer);

    const prompt = `
      You are an HR assistant. Compare the resume with the job description.
      Provide a structured JSON output:
      {
        "matchScore": "85%",
        "keyStrengths": ["Skill 1", "Skill 2", "Skill 3"],
        "potentialGaps": ["Missing skill 1", "Missing skill 2"],
        "summary": "Two-sentence overview"
      }

      JOB DESCRIPTION:
      ${jobDescription}

      RESUME:
      ${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Correct API
    const result = await model.generateContent(prompt);
    let jsonText = result.response.text();

    jsonText = jsonText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    const repaired = jsonrepair(jsonText);
    const parsed = JSON.parse(repaired);
    res.json(parsed);
  } catch (err) {
    console.error("AI Resume Screening Error:", err);
    res.status(500).json({ error: "Failed to screen resume" });
  }
});

// =====================================================
// ⚙️ ERROR HANDLER + SERVER START
// =====================================================
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError)
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  if (err)
    return res.status(500).json({ error: err.message || "Unexpected error occurred." });
  next();
});

app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

app.listen(port, () => {
  console.log(`🚀 AI server running on http://localhost:${port}`);
});
