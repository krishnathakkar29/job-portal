import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conected to MongoDB Successfully ${connection.host}`);
  } catch (error) {
    console.log("MONGODB Connection Failed!!!", error);
  }
};
