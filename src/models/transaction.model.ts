import mongoose, { Schema } from "mongoose";

interface transaction {
  walletId: string;
  amount: string;
  type: string;
  date: string;
}

const transactionSchema = new Schema({
  walletId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  date: { type: Date, default: Date.now() },
});

export const transactionModel = mongoose.model<transaction>(
  "transaction",
  transactionSchema
);
