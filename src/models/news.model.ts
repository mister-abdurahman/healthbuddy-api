import mongoose, { Schema } from "mongoose";

interface news {
  title: string;
  text: string;
  date: string;
  link: string;
  image: string;
}

const newsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, default: "" },
});

export const newsModel = mongoose.model<news>("news", newsSchema);
