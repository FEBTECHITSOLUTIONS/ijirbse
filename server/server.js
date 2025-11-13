import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import routes from './routes/routes.js';
import dbConfig from './config/db.js';
import cookieParser from 'cookie-parser';

const journalServer = express();

// Middleware
journalServer.use(express.json());
journalServer.use(cookieParser())
journalServer.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // multiple allowed frontends
    credentials: true, // ✅ allows cookies & authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static file serving
journalServer.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Use your existing API routes
journalServer.use('/api', routes);

// Connect DB and start server
dbConfig()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    journalServer.listen(PORT, () => {
      console.log(`✅ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
  });
