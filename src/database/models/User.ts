import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  telegramId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  goal?: "mass" | "fat-loss";
  currentDay?: number;
  lastWorkoutDate?: Date;
}

const userSchema: Schema = new Schema({
  telegramId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  goal: {
    type: String,
    enum: ["mass", "fat-loss"],
  },
  currentDay: { type: Number, default: 0 },
  lastWorkoutDate: Date,
});

export const User = mongoose.model<IUser>("User", userSchema);
