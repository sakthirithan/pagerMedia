import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

const app = express();
const PORT = 4000

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("Server is Running");


  } catch (error) {
    res.status(500).send("DB Error: " + error.message);
  }
});

// Start the server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

export default app;
