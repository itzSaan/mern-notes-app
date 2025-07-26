import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    data: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // Reference to the User model
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
  }
);

const noteModel = mongoose.models.notes || mongoose.model("notes", noteSchema);

export default noteModel;
