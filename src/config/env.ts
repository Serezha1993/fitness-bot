import { config } from "dotenv";
config();

const BOT_TOKEN = process.env.BOT_TOKEN!;

if (!BOT_TOKEN) {
  throw new Error("❌ BOT_TOKEN не задан в .env");
}

export { BOT_TOKEN };

