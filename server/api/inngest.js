import { serve } from "inngest/express";

export default function handler(req, res) {
  return serve({
    client: { id: "test" }, // dummy test
    functions: [],
  })(req, res);
}