import { Context } from "telegraf";
import { massPlan } from "../data/workoutPlan";
import { sendPlan } from "./utils/sendPlan";


export function planCommand(ctx: Context) {
  return sendPlan(ctx, massPlan);
}
