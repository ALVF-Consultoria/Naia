import express from "express";
import ebookRoutes from "./routes/ebookRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/ebook", ebookRoutes);

app.listen(3001, () => console.log("Backend rodando na porta 3001"));
