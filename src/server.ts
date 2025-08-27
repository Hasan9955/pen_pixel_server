import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import { postRouters } from './routes/post.route'; 



const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
}));
app.use(json());
app.use(morgan('dev'));

// routes
app.use("/api/posts", postRouters);

app.get('/', (req, res) => res.send('Blog server is running')); 


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});


