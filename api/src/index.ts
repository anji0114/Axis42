import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { prisma } from '@/core/database';
import { passportInstance } from '@/core/auth/services/passport.service';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3300;

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport初期化
app.use(passportInstance.initialize());

// Routes
app.use('/api/auth', authRoutes);

// Hello Worldルート
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World from Axis42 API!', timestamp: new Date().toISOString() });
});

// Database connection test
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// サーバー起動
async function startServer() {
  try {
    await prisma.connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();