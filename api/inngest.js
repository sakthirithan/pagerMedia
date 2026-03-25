import { serve } from "inngest/vercel";
import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

export const config = {
  runtime: "nodejs",
};

const handler = serve({
  client: inngest,
  functions,
});

export default async function (req, res) {
  await connectDB();
  return handler(req, res);
}