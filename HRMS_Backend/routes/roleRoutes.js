import express from "express";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// --- Roles List ---
router.get("/roles", authMiddleware, isAdmin, async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: { select: { users: true } },
        permissions: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });
    res.json(
      roles.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        userCount: r._count.users,
        permissions: r.permissions.map((p) => p.name),
      }))
    );
  } catch (error) {
    console.error("Fetch roles error:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// --- Permissions List ---
router.get("/permissions", authMiddleware, isAdmin, async (req, res) => {
  try {
    const permissions = await prisma.permission.findMany({
      orderBy: { category: "asc" },
    });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
});

export default router;
