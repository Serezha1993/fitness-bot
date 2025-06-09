import { config } from "dotenv";
config();

const BOT_TOKEN = process.env.BOT_TOKEN!;
const MONGODB_URI = process.env.MONGODB_URI!;

if (!BOT_TOKEN || !MONGODB_URI) {
  throw new Error("❌ BOT_TOKEN не задан в .env");
}

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI не задан в .env");
}

export { BOT_TOKEN, MONGODB_URI };


console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
