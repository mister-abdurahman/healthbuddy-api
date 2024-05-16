import mongoose, { Schema } from "mongoose";

interface doctor {
  title: string;
  firstName: string;
  lastName: string;
  type: string;
  yearsOfPractice: number;
}

const doctorSchema = new Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: { type: String, required: true },
  yearsOfPractice: { type: Number, required: true },
});

export const doctorModel = mongoose.model<doctor>("doctor", doctorSchema);
