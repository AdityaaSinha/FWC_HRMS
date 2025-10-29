import express from "express";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const jobCount = await prisma.job.count();
  const candidateCount = await prisma.candidate.count();
  const openJobs = await prisma.job.count({ where: { status: "OPEN" } });

  res.json({
    message: `Welcome, ${req.user.name}!`,
    stats: { jobCount, candidateCount, openJobs },
  });
});

export default router;
