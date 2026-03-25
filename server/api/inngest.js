import { serve } from "inngest/express";
import connectDB from "../configs/db.js";
import { inngest, functions } from "../inngest/index.js";

let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

export default async function handler(req, res) {
  try {
    await connectDatabase();

    return serve({
      client: inngest,
      functions,
    })(req, res);

  } catch (error) {
    console.error("Inngest Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
}