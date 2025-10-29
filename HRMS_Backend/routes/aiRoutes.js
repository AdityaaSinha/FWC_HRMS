import express from "express";
import ai from "../config/ai.js";
import upload from "../config/multerConfig.js";
import { extractTextFromPDF } from "../utils/extractTextFromPDF.js";
import { jsonrepair } from "jsonrepair";

const router = express.Router();

/* =========================================================
   🤖 1. AI JOB DESCRIPTION GENERATOR
   ========================================================= */
router.post("/generate-jd", async (req, res) => {
  try {
    console.log("🟩 /generate-jd body:", req.body);
    const { title, department, keywords } = req.body;

    if (!title)
      return res.status(400).json({ error: "Job title is required" });

    const prompt = `
      Write a detailed, professional job description for the position of ${title}.
      Department: ${department || "Not specified"}.
      Required skills: ${keywords?.join(", ") || "Not specified"}.
      Company: Confidential.

      Structure it as:
      - Job Title
      - About the Company
      - Responsibilities
      - Required Skills
      - Preferred Qualifications
      - Benefits
      - How to Apply
    `;

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const jdText = result.response.text();

    res.json({ jobDescription: jdText });
  } catch (error) {
    console.error("JD Generation Error:", error);
    res.status(500).json({ error: "Failed to generate JD" });
  }
});

/* =========================================================
   📄 2. AI RESUME SCREENING AGAINST JD (PDF)
   ========================================================= */
router.post("/screen-resume-pdf", upload.single("resume"), async (req, res) => {
  try {
    console.log("🟩 /screen-resume-pdf body:", req.body);
    console.log("🟦 Uploaded file:", req.file?.originalname);

    // 1️⃣ Validate inputs
    const { jobDescription } = req.body;
    if (!req.file || !jobDescription) {
      return res
        .status(400)
        .json({ error: "Missing resume file or job description" });
    }

    // 2️⃣ Extract text from the uploaded resume
    const resumeText = await extractTextFromPDF(req.file.buffer);
    console.log("📄 Extracted resume text length:", resumeText?.length || 0);

    // 3️⃣ Build AI prompt
    const prompt = `
You are an AI HR assistant screening resumes for a job.

Compare the following:

JOB DESCRIPTION:
${jobDescription}

RESUME TEXT:
${resumeText}

Respond ONLY in JSON format (no markdown or code fences).
Example output:
{
  "matchScore": 85,
  "summary": "The candidate has strong React experience...",
  "keyStrengths": ["Proficient in React", "Good teamwork"],
  "potentialGaps": ["No backend experience"]
}
`;

    console.log("🤖 Sending prompt to Gemini...");
    const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);

    // 4️⃣ Capture AI raw response
    let rawText = result.response.text();
    console.log("🧠 Gemini raw output:", rawText);

    // 5️⃣ Clean markdown fences or extra characters
    rawText = rawText.replace(/```json/i, "").replace(/```/g, "").trim();

    // 6️⃣ Try parsing JSON safely
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.warn("⚠️ Invalid JSON, attempting jsonrepair...");
      try {
        parsed = JSON.parse(jsonrepair(rawText));
      } catch (repairErr) {
        console.error("❌ JSON parse failed even after repair:", repairErr.message);
        return res.status(500).json({
          error: "AI returned invalid JSON",
          rawText,
        });
      }
    }

    // 7️⃣ Return structured data to frontend
    res.json({
      matchScore: parsed.matchScore ?? 0,
      summary: parsed.summary || "No summary provided.",
      keyStrengths: parsed.keyStrengths || [],
      potentialGaps: parsed.potentialGaps || [],
    });
  } catch (error) {
    console.error("🔥 Resume Screening Error:", error);
    res.status(500).json({
      error: "Failed to analyze resume",
      details: error.message,
    });
  }
});

export default router;
