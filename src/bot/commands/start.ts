import { Context } from "telegraf";
import { goalCommand } from "./goal";

export const startCommand = async (ctx: Context) => {
  const telegramId = String(ctx.from?.id);

  const existingUser = await User.findOne({ telegramId });
  if (!existingUser) {
    await User.create({
      telegramId,
      firstName: ctx.from?.first_name,
      lastName: ctx.from?.last_name,
      username: ctx.from?.username,
    });
  }

  await ctx.reply(
    `Привет, ${ctx.from?.first_name}! Добро пожаловать в фитнес-бот 💪`
  );

  return goalCommand(ctx);
};
