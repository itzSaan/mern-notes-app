import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-notes`);    
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;