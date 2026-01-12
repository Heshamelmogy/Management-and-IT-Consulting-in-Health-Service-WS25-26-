import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './database';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import calorieRoutes from './routes/calories';
import fitnessRoutes from './routes/fitness';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDatabase().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/calories', calorieRoutes);
app.use('/api/fitness', fitnessRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FitnessPoint API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
