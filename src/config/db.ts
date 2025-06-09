import mongoose from "mongoose";

export const connectDB = async (MONGODB_URI: string) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Подключено к MongoDB");
  } catch (error) {
    console.error("❌ Ошибка при подключении к MongoDB:", error);
    throw error;
  }
};

