import express from "express";
import { generateEpub } from "../services/epubService.js";

const router = express.Router();

router.post("/generate-epub", async (req, res) => {
  try {
    const { title, author, storyText } = req.body;
    const filePath = await generateEpub(title, author, storyText);
    res.download(filePath); // envia para download
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao gerar ePub" });
  }
});

export default router;
