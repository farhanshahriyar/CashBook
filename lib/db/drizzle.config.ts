import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "drizzle-kit";

// Load .env from workspace root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL or DIRECT_URL must be set. Check your .env file.");
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
