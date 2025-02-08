import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  console.log("DB has been connected successfully. 🟢✅");
  return cached.conn;
}

export default connectDB;
