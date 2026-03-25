// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { inngest, functions } from "./inngest/index.js";
// import { serve } from "inngest/express";

// const app = express();
// const PORT = 4000
// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to DB
//   try {
//     await connectDB()

//   } catch (error) {
//     console.error("DB connection failed:", error.message);
//   }

// // Routes
// app.get("/", (req, res) => res.send("Server is Running Successfully"));
// app.use("/api/inngest", serve({ client: inngest, functions }));
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });


// export default app;

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
    res.send("Server is Running ✅");
  } catch (error) {
    res.status(500).send("DB Error: " + error.message);
  }
});

export default app;
