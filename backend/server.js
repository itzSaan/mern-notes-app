import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRouter.js';

const server = express();
const port = process.env.PORT || 8000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

server.use(express.json()); // to use json as response
server.use(cookieParser()); // to use & save cookie
server.use(cors({origin: allowedOrigins, credentials: true}));

// API Endpoint
server.get('/', (req, res) => {
  res.status(200).send('API is working!')
})

server.use('/api/user', authRouter)
server.use('/api/notes', notesRouter)

server.listen(port, ()=> console.log(`Server is running on ${port}`))