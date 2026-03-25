import { serve } from "inngest/express";
import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    return serve({
      client: inngest,
      functions,
    })(req, res);

  } catch (error) {
    console.error("Inngest Error:", error.message);
    res.status(500).send("Error");
  }
}