import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root BEFORE any other imports
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Dynamic imports so DATABASE_URL is available when @workspace/db initializes
const { default: app } = await import("./app");
const { logger } = await import("./lib/logger");

const port = Number(process.env["PORT"] || 3000);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env["PORT"]}"`);
}

app.listen(port, () => {
  logger.info({ port }, "Server listening");
});
