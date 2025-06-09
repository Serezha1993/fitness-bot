import { Telegraf } from "telegraf";
import { config } from "dotenv";
config();

import { BOT_TOKEN, MONGODB_URI } from "./config/env.js";

import { connectDB } from "./config/connectDB";

import { planCommand } from "./bot/commands/plan";
import { startCommand } from "./bot/commands/start";
import { goalCommand } from "./bot/commands/goal";
import { sendPlan } from "./bot/commands/utils/sendPlan";
import { generateWorkoutPlan } from "./bot/data/workoutPlan";
import { callbackHandler } from "./bot/handlers/callbackHandler";
import { handleDailyTraining } from "./bot/handlers/trainingHandler";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  console.log(`👤 Новый пользователь: ${ctx.from?.username}`);
  return startCommand(ctx);
});

bot.command("plan", planCommand);
bot.command("goal", goalCommand);
bot.command("training", handleDailyTraining);
bot.on("callback_query", callbackHandler);

bot.action("goal_mass", (ctx) => {
  const plan = generateWorkoutPlan("mass");
  sendPlan(ctx, plan);
});

bot.action("goal_fat", (ctx) => {
  const plan = generateWorkoutPlan("fat-loss");
  sendPlan(ctx, plan);
});

async function launchBot() {
  try {
    await connectDB(MONGODB_URI);
    await bot.launch();
    console.log("✅ Бот успешно запущен!");
  } catch (err) {
    console.error("❌ Ошибка при запуске бота:", err);
    if (!(err instanceof Error)) {
      console.log("Тип ошибки:", typeof err);
      console.dir(err, { depth: null });
    }
  }
}

process.on("uncaughtException", (err) => {
  console.error("❌ uncaughtException:");
  console.error(err instanceof Error ? err.stack : err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ unhandledRejection:");
  console.error(reason instanceof Error ? reason.stack : reason);
});

launchBot();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
