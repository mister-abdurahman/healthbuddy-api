import mongoose, { Schema } from "mongoose";

interface notification {
  userId: string;
  note: string;
  read: boolean;
  date: string;
}

const notificationSchema = new Schema({
  userId: { type: String, required: true },
  note: { type: String, required: true },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now() },
});

export const notificationModel = mongoose.model<notification>(
  "notification",
  notificationSchema
);
