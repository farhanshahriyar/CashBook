/**
 * Vercel Serverless Function entrypoint.
 *
 * Vercel invokes this file for every request. We configure env vars
 * then re-export the Express app so @vercel/node handles HTTP routing.
 *
 * On Vercel the env vars come from the dashboard, so dotenv is a
 * no-op there, but it lets us test locally with `vercel dev`.
 */
import type { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Use a lazy-init pattern to avoid top-level await
let _app: ((req: Request, res: Response) => void) | null = null;

async function getApp() {
  if (!_app) {
    const mod = await import("../src/app");
    _app = mod.default;
  }
  return _app;
}

export default async function handler(req: Request, res: Response) {
  const app = await getApp();
  return app(req, res);
}
