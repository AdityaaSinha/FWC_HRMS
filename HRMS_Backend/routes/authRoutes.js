import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =========================================================
   🧩 REGISTER USER (Basic Test Endpoint)
   ========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body; // use roleId not role name
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Registering user:", { name, email, roleId });

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, roleId },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(400)
      .json({ error: "Registration failed", details: error.message });
  }
});

/* =========================================================
   🔐 LOGIN ROUTE
   ========================================================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login attempt:", email);

  try {
    // Fetch user + role name
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }, // ✅ Include role relation
    });

    console.log("🔍 User fetched from DB:", user ? user.email : "Not found");

    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    console.log("🔑 Password valid:", valid);

    if (!valid)
      return res.status(401).json({ error: "Invalid password" });

    // Generate JWT safely
    const token = jwt.sign(
      { id: user.id, role: user.role?.name },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Log login activity
    await prisma.loginActivity.create({
      data: { userId: user.id, activity: "User logged in" },
    });

    console.log("✅ Login success:", { user: user.email, role: user.role?.name });

    // Respond
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
      },
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res
      .status(500)
      .json({ error: "Login failed", details: error.message });
  }
});

/* =========================================================
   👤 PROFILE (Protected)
   ========================================================= */
router.get("/me", authMiddleware, (req, res) => {
  console.log("🔐 Accessing /me:", req.user);
  res.json(req.user);
});

export default router;
