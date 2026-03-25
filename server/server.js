import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// 1. Import the Express adapter and your Inngest setup
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"; 

const app = express();

app.use(express.json());
app.use(cors());

// 2. Attach Inngest directly to your Express router
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: functions,
  })
);

// Your normal root route
app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("server is running");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
);

export default app;