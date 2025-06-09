import { Context } from "telegraf";
import { z } from "zod";
import { User } from "../../database/models/User";
import { sendPlan } from "../commands/utils/sendPlan";
import { generateWorkoutPlan } from "../data/workoutPlan";

const callbackQuerySchema = z.object({
  data: z.enum(["goal_mass", "goal_fat", "ready_yes", "ready_no"]),
});

export async function callbackHandler(ctx: Context) {
  const callback = ctx.callbackQuery;

  const result = callbackQuerySchema.safeParse(callback);
  if (!result.success) return;

  const data = result.data.data;

  const userId = ctx.from?.id;
  if (!userId) return;

  const user = await User.findOne({ telegramId: userId });
  if (!user) return;

  switch (data) {
    case "goal_mass":
    case "goal_fat": {
      const goal: "mass" | "fat-loss" =
        data === "goal_mass" ? "mass" : "fat-loss";
      user.goal = goal;
      await user.save();

      await ctx.answerCbQuery("Цель сохранена!");
      await ctx.reply(
        `Вы выбрали цель: ${goal === "mass" ? "Набор массы" : "Похудение"}`
      );

      const plan = generateWorkoutPlan(goal);
      await sendPlan(ctx, plan, "monday");
      break;
    }

    case "ready_yes": {
      if (user.goal !== "mass" && user.goal !== "fat-loss") {
        await ctx.reply("Сначала выберите цель с помощью /goal");
        return;
      }

      const plan = generateWorkoutPlan(user.goal);
      await sendPlan(ctx, plan, "monday");
      break;
    }

    case "ready_no":
      await ctx.reply(
        "Отлично, отдыхайте! В следующий раз будете готовы — продолжим тренировки."
      );
      break;
  }

  await ctx.answerCbQuery();
}
