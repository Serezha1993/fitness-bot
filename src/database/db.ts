import mongoose from "mongoose";
import { IUser, User } from "./models/User";

class DatabaseService {
  private readonly url: string;
  constructor() {
    this.url = `mongodb://localhost:27017/`;
    void mongoose.connect(this.url, {
      dbName: "fitness",
      authSource: "admin",
    });
    const connect = mongoose.connection;
    connect.on(
      "error",
      console.error.bind(console, "Ошибка подключения к базе данных:")
    );

    connect.once("open", () => {
      console.log("Успешное подключение к базе данных.");
    });
  }
  async getUser(telegramId: string) {
    return await User.findOne({ telegramId });
  }

  async setUser(user: IUser) {
    const { telegramId, firstName, lastName, username } = user;
    const existingUser = await this.getUser(telegramId);
    if (!existingUser) {
      await User.create({
        telegramId,
        firstName,
        lastName,
        username,
      });
    }
  }
}

const db = new DatabaseService();
export default db;
