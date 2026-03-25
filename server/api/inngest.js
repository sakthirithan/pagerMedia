import { serve } from "inngest/express";
import connectDB from "../configs/db.js";
import { inngest, functions } from "../inngest/index.js";

export default async function handler(req, res) {
  try {
    console.log("Inngest function called");

    await connectDB(); // ensure DB

    const handlerFn = serve({
      client: inngest,
      functions,
    });

    return handlerFn(req, res);

  } catch (error) {
    console.error("❌ INNGEST CRASH:", error);
    return res.status(500).json({
      error: "Inngest failed",
      message: error.message,
    });
  }
}