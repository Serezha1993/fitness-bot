// src/bot/handlers/trainingHandler.ts
import { Context } from "telegraf";
import { User } from "../../database/models/User";
import { sendPlan } from "../commands/utils/sendPlan";

export async function handleDailyTraining(ctx: Context) {
  const telegramId = String(ctx.from?.id);
  const user = await User.findOne({ telegramId });

  if (!user) return;

  const today = new Date();
  const lastDate = user.lastWorkoutDate ? new Date(user.lastWorkoutDate) : null;

  const oneDay = 24 * 60 * 60 * 1000;

  if (!lastDate || (today.getTime() - lastDate.getTime() >= oneDay * 2)) {
    await ctx.reply("Вы готовы тренироваться сегодня?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "✅ Да", callback_data: "ready_yes" }],
          [{ text: "❌ Нет", callback_data: "ready_no" }],
        ],
      },
    });
  }
}
