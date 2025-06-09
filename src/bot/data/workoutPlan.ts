export interface Exercise {
  exercise: string;
  sets: number;
  reps: number | string;
  rest: string;
  image: string;
  videoUrl: string;
}

export interface WorkoutPlan {
  [day: string]: Exercise[];
}

export const massPlan: WorkoutPlan = {
  monday: [
    {
      exercise: "Приседания с тяжестями",
      sets: 5,
      reps: 6,
      rest: "90 секунд",
      image:
        "https://www.ddxfitness.ru/upload/resize_cache/iblock/0c7/681_370_2/m8vtalhqornk13ex12utava3g28wvc1s.jpeg",
      videoUrl: "https://www.youtube.com/watch?v=JkDHLuG7VfY",
    },
    {
      exercise: "Жим ногами",
      sets: 5,
      reps: 8,
      rest: "90 секунд",
      image: "https://example.com/leg-press.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
  tuesday: [
    {
      exercise: "Бег на беговой дорожке (Кардио)",
      sets: 1,
      reps: "30 минут",
      rest: "Без отдыха",
      image: "https://example.com/treadmill.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      exercise: "Пресс (скручивания)",
      sets: 4,
      reps: 20,
      rest: "60 секунд",
      image: "https://example.com/crunch.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
  wednesday: [
    {
      exercise: "Тяга штанги в наклоне",
      sets: 4,
      reps: 8,
      rest: "90 секунд",
      image: "https://example.com/row.jpg",
      videoUrl: "https://www.youtube.com/watch?v=F0kHksIk3g4",
    },
    {
      exercise: "Подтягивания",
      sets: 4,
      reps: 6,
      rest: "90 секунд",
      image: "https://example.com/pullups.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YgvKshjT7Jg",
    },
  ],
  thursday: [
    {
      exercise: "Кардио (велотренажер)",
      sets: 1,
      reps: "30 минут",
      rest: "Без отдыха",
      image: "https://example.com/bike.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      exercise: "Пресс (планка)",
      sets: 3,
      reps: "45 секунд",
      rest: "60 секунд",
      image: "https://example.com/plank.jpg",
      videoUrl: "https://www.youtube.com/watch?v=AKwB0AqFopk",
    },
  ],
  friday: [
    {
      exercise: "Жим штанги лежа",
      sets: 5,
      reps: 6,
      rest: "90 секунд",
      image: "https://example.com/bench-press.jpg",
      videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
    },
    {
      exercise: "Отжимания на брусьях",
      sets: 4,
      reps: 8,
      rest: "90 секунд",
      image: "https://example.com/dips.jpg",
      videoUrl: "https://www.youtube.com/watch?v=J4G7OjrPpSo",
    },
  ],
  saturday: [
    {
      exercise: "Кардио (скакалка)",
      sets: 1,
      reps: "30 минут",
      rest: "Без отдыха",
      image: "https://example.com/jump-rope.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      exercise: "Берпи",
      sets: 4,
      reps: 15,
      rest: "60 секунд",
      image: "https://example.com/burpees.jpg",
      videoUrl: "https://www.youtube.com/watch?v=JvT06mjd0tY",
    },
  ],
  sunday: [
    {
      exercise: "Растяжка и восстановление",
      sets: 1,
      reps: "20 минут",
      rest: "Без отдыха",
      image: "https://example.com/stretch.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
};

export const fatLossPlan: WorkoutPlan = {
  monday: [
    {
      exercise: "Кардио 30 минут",
      sets: 1,
      reps: "30 мин",
      rest: "—",
      image: "https://example.com/cardio.jpg",
      videoUrl: "https://www.youtube.com/watch?v=video2",
    },
  ],
  // другие дни
};

export function generateWorkoutPlan(goal: "mass" | "fat-loss"): WorkoutPlan {
  if (goal === "mass") {
    return massPlan;
  } else if (goal === "fat-loss") {
    return {
      monday: massPlan.monday.map((exercise) => ({
        ...exercise,
        sets: exercise.sets * 1.5,
        reps: typeof exercise.reps === "number" ? 20 : exercise.reps,
      })),
      tuesday: massPlan.tuesday,
      wednesday: massPlan.wednesday,
      thursday: massPlan.thursday.map((exercise) => ({
        ...exercise,
        sets: 3,
        reps: typeof exercise.reps === "number" ? 20 : exercise.reps,
      })),
      friday: massPlan.friday.map((exercise) => ({
        ...exercise,
        sets: 3,
        reps: typeof exercise.reps === "number" ? 20 : exercise.reps,
      })),
      saturday: massPlan.saturday,
      sunday: massPlan.sunday,
    };
  }
  return massPlan;
}
