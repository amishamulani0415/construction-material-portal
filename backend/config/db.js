import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.name}`);
    console.log(`📦 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(error.message);
    process.exit(1);
  }
}
