import mongoose from "mongoose";

// Create a schema:

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  // createdAt, updatedAt
  {
    timestamps: true,
  },
);

// Create a model based off the schema:

const Note = mongoose.model("Note", noteSchema);

export default Note;
