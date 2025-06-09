import { Context, Markup } from "telegraf";
import { WorkoutPlan, Exercise } from "../../data/workoutPlan";

export function sendPlan(ctx: Context, plan: WorkoutPlan, day?: string) {
  let message = "📅 *Ваш план тренировок:*\n\n";

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (day && plan[day]) {
    message += `🗓️ *${capitalizeFirstLetter(day)}:*\n`;
    plan[day].forEach((exercise) => {
      message += formatExercise(exercise);
    });
  } else {
    for (const dayKey in plan) {
      message += `🗓️ *${capitalizeFirstLetter(dayKey)}:*\n`;
      plan[dayKey].forEach((exercise) => {
        message += formatExercise(exercise);
      });
      message += "\n";
    }
  }

  return ctx.reply(message, { parse_mode: "Markdown" });
}

function formatExercise(exercise: Exercise): string {
  return `• *${exercise.exercise}*\n👊 Подходы: ${exercise.sets}, Повторы: ${exercise.reps}, Отдых: ${exercise.rest}\n📸 [Фото](${exercise.image}) | 🎥 [Видео](${exercise.videoUrl})\n\n`;
}
