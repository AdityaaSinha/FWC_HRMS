import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const jobs = await prisma.job.findMany({ where: { archived: false } });
  res.json(jobs);
});

router.post("/", async (req, res) => {
  try {
    const job = await prisma.job.create({ data: req.body });
    res.status(201).json(job);
  } catch {
    res.status(400).json({ error: "Failed to create job" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await prisma.job.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Update failed" });
  }
});

router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { status: req.body.status },
    });
    res.json(job);
  } catch {
    res.status(400).json({ error: "Status update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.job.update({
      where: { id: parseInt(id) },
      data: { archived: true },
    });
    res.json({ message: "Job archived" });
  } catch {
    res.status(400).json({ error: "Archive failed" });
  }
});

export default router;
