// bot/commands/goal.ts
import { Context } from "telegraf";

export function goalCommand(ctx: Context) {
  ctx.reply("Выберите вашу цель:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Набор массы 💪", callback_data: "goal_mass" }],
        [{ text: "Похудение 🏃‍♂️", callback_data: "goal_fat" }],
      ],
    },
  });
}
