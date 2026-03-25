import { serve } from "inngest/express";
import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

export default function handler(req, res) {
  res.status(200).json({ message: "Step 1 working ✅" });
}