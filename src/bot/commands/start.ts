import { Context } from "telegraf";
import { goalCommand } from "./goal";
import db from "../../database/db";
import { User } from "telegraf/typings/core/types/typegram";
import { IUser } from "../../database/models/User";

export const startCommand = async (ctx: Context) => {
  const { username, first_name, last_name, id } = ctx.from as User;
  const user: IUser = {
    telegramId: String(id),
    firstName: first_name,
    lastName: last_name,
    username,
  };
  await db.setUser(user);
  await ctx.reply(
    `Привет, ${ctx.from?.first_name}! Добро пожаловать в фитнес-бот 💪`
  );

  return goalCommand(ctx);
};
