import { NextFunction, Request, Response } from "express";
import { transactionModel } from "../models/transaction.model";
import { walletModel } from "../models/wallet.model";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id == "undefined" || req.params.id == "null") {
    return res.status(400).json({
      message: "Id is missing!",
    });
  }
  const check = transactionModel.findById(req.params.id);
  if (!check) {
    return res.status(400).json({
      message: "Incorrect Id !",
    });
  }
  next();
};
export const checkWalletId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.walletId == "undefined" || req.params.walletId == "null") {
    return res.status(400).json({
      message: "wallet Id is missing!",
    });
  }
  const check = transactionModel.findOne({ walletId: req.params.id });
  if (!check) {
    return res.status(400).json({
      message: "Incorrect Wallet Id !",
    });
  }
  next();
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const y = await walletModel.findById(req.body.walletId);

    if (req.body.type === "debit" && +y!.currentBalance < +req.body.amount) {
      return res.status(400).json({
        data: null,
        hasError: true,
        message: "Insufficient Funds ⚠",
      });
    }

    const updatedWallet =
      y && req.body.type === "debit"
        ? +y.currentBalance - +req.body.amount
        : y && +y.currentBalance + +req.body.amount;
    const wallet = await walletModel.findByIdAndUpdate(req.body.walletId, {
      currentBalance: updatedWallet,
    });
    const transaction = await transactionModel.create(req.body);
    res.status(200).json({ message: "Transaction created successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while creating Transaction",
    });
  }
};
export const getAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find();

  try {
    res.status(200).json({
      data: transactions,
      message: "Fetched all Transactions successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching transactions",
    });
  }
};
export const getTransactionById = async (req: Request, res: Response) => {
  const transaction = await transactionModel.findById(req.params.id);
  try {
    res.status(200).json({
      data: transaction,
      message: "Fetched transaction successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching transaction",
    });
  }
};
export const getTransactionsByWalletId = async (
  req: Request,
  res: Response
) => {
  const transactions = await transactionModel.find({
    walletId: req.params.id,
  });
  try {
    res.status(200).json({
      data: transactions,
      message: "Fetched transactions successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching transactions",
    });
  }
};
