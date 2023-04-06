import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to mongoDb successfully..");
};

app.listen(5000, () => {
  main();
  console.log("server running...");
});
