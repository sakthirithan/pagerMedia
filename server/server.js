import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js'

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Server is Running'))
app.use('/api/inngest', serve({ client: inngest, functions }))

const PORT = process.env.PORT || 4000;



// Start server safely
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });

  } catch (error) {
    console.log("Server failed to start:", error.message);
  }
