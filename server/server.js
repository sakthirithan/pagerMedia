import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("server is running");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default app;