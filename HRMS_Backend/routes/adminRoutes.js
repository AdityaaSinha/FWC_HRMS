import express from "express";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

/* =========================================================
   👑 ADMIN DASHBOARD OVERVIEW
   ========================================================= */
router.get("/dashboard-stats", authMiddleware, isAdmin, async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const jobCount = await prisma.job.count();
    const candidateCount = await prisma.candidate.count();
    const loginActivityCount = await prisma.loginActivity.count();

    res.json({
      stats: {
        totalUsers: userCount,
        totalJobs: jobCount,
        totalCandidates: candidateCount,
        totalLogins: loginActivityCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});

/* =========================================================
   🧑‍💼 DEPARTMENT OVERVIEW
   ========================================================= */
router.get("/department-overview", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { department: true },
    });

    const departmentCounts = {};
    users.forEach((u) => {
      if (!u.department) return;
      departmentCounts[u.department] = (departmentCounts[u.department] || 0) + 1;
    });

    res.json({ departmentOverview: departmentCounts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department overview" });
  }
});

/* =========================================================
   🆕 RECENT EMPLOYEES
   ========================================================= */
router.get("/recent-employees", authMiddleware, isAdmin, async (req, res) => {
  try {
    const recent = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true, department: true, createdAt: true },
    });

    res.json({ recentEmployees: recent });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent employees" });
  }
});

/* =========================================================
   📈 DAILY LOGIN ACTIVITY
   ========================================================= */
router.get("/activity/daily", authMiddleware, isAdmin, async (req, res) => {
  try {
    const activities = await prisma.loginActivity.groupBy({
      by: ["hour"],
      _count: true,
    });

    res.json({ dailyActivity: activities });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily activity" });
  }
});

/* =========================================================
   📆 WEEKLY LOGIN ACTIVITY
   ========================================================= */
router.get("/activity/weekly", authMiddleware, isAdmin, async (req, res) => {
  try {
    const activities = await prisma.loginActivity.groupBy({
      by: ["day"],
      _count: true,
    });

    res.json({ weeklyActivity: activities });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weekly activity" });
  }
});

/* =========================================================
   📥 BULK IMPORT USERS
   ========================================================= */
router.post("/users/bulk-import", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { users } = req.body;
    if (!users?.length) return res.status(400).json({ error: "No users provided" });

    const createdUsers = await prisma.$transaction(
      users.map((u) =>
        prisma.user.create({
          data: {
            name: u.name,
            email: u.email,
            role: u.role || "EMPLOYEE",
            department: u.department || null,
          },
        })
      )
    );

    // Log import
    await prisma.importJob.create({
      data: {
        adminId: req.user.id,
        count: createdUsers.length,
        status: "COMPLETED",
      },
    });

    res.json({ message: "Bulk import successful", count: createdUsers.length });
  } catch (error) {
    console.error("Bulk Import Error:", error);
    res.status(500).json({ error: "Bulk import failed" });
  }
});

/* =========================================================
   📤 EXPORT USERS
   ========================================================= */
router.get("/users/export", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, department: true, createdAt: true },
    });

    // Log export job
    await prisma.exportJob.create({
      data: { adminId: req.user.id, count: users.length, status: "COMPLETED" },
    });

    res.json({ exportedUsers: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to export users" });
  }
});

/* =========================================================
   📜 IMPORT HISTORY
   ========================================================= */
router.get("/history/imports", authMiddleware, isAdmin, async (req, res) => {
  try {
    const imports = await prisma.importJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json({ importHistory: imports });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch import history" });
  }
});

/* =========================================================
   📜 EXPORT HISTORY
   ========================================================= */
router.get("/history/exports", authMiddleware, isAdmin, async (req, res) => {
  try {
    const exports = await prisma.exportJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json({ exportHistory: exports });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch export history" });
  }
});

export default router;
