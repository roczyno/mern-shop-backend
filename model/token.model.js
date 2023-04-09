import mongoose, { Schema } from "mongoose";

const tokenSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAT: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

export default mongoose.model("Token", tokenSchema);
