import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { prisma } from "@/core/database";
import { passportInstance } from "@/core/auth/passportService";
import authRoutes from "./routes/auth.routes";
import { root } from "@/modules/root";

const app = express();
const PORT = process.env.PORT || 3300;

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport初期化
app.use(passportInstance.initialize());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send(root());
});

// サーバー起動
async function startServer() {
  try {
    await prisma.connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
