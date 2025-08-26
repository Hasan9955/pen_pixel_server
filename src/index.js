import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
}));
app.use(json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => res.send('Blog server is running'));
app.use('/api/posts', postRoutes);

// start
connectDB();
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
