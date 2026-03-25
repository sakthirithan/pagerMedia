import { serve } from "inngest/express";
import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const handler = serve({
  client: inngest,
  functions,
});

export default async function (req, res) {
  await connectDB(); // connect DB first
  return handler(req, res); // direct call
}