import { NextFunction, Request, Response } from "express";
import { walletModel } from "../models/wallet.model";
import { userModel } from "../models/user.model";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.params.id ||
    req.params.id == "undefined" ||
    req.params.id == "null"
  ) {
    return res.status(400).json({
      message: "Id is missing!",
      hasError: true,
    });
  }
  const check = walletModel.findById(req.params.id);
  if (!check) {
    return res.status(400).json({
      hasError: true,
      message: "Incorrect Id !",
    });
  }

  next();
};
export const checkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.userId == "undefined" || req.params.userId == "null") {
    return res.status(400).json({
      hasError: true,
      message: "User Id is missing!",
    });
  }
  const check = userModel.findOne({ userId: req.params.userId });
  if (!check) {
    return res.status(400).json({
      hasError: true,
      message: "Incorrect User Id !",
    });
  }

  next();
};

export const getAllWallets = async (req: Request, res: Response) => {
  const wallets = await walletModel.find();
  try {
    res.status(200).json({
      data: wallets,
      message: "Fetched all wallets successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching wallet",
    });
  }
};
export const getWalletById = async (req: Request, res: Response) => {
  const wallet = await walletModel.findById(req.params.id);

  try {
    res.status(200).json({
      data: wallet,
      message: "Fetched wallet successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching wallet",
    });
  }
};
export const getWalletByUserId = async (req: Request, res: Response) => {
  const wallet = await walletModel.findOne({ userId: req.params.id });

  try {
    res.status(200).json({
      data: wallet,
      message: "Fetched wallet successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching wallet",
    });
  }
};
export const createWallet = async (req: Request, res: Response) => {
  const Wallet = new walletModel(req.body);

  try {
    Wallet.save();
    res.status(200).json({ message: "Wallet created successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while creating Wallet",
    });
  }
};

export const updateWallet = async (req: any, res: Response) => {
  //   let wallet = await walletModel.findById(req.params.id);
  //   wallet = { ...wallet, ...req.body };

  req.wallet = await walletModel.findById(req.params.id);
  let wallet = req.wallet;

  wallet.currentBalance = req.body.currentBalance || wallet.currentBalance;

  try {
    wallet.save();
    res.status(200).json({ message: "wallet Updated successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while updating wallet",
    });
  }
};
export const addToWallet = async (req: any, res: Response) => {
  //   let wallet = await walletModel.findById(req.params.id);
  //   wallet = { ...wallet, ...req.body };
  if (!req.query.fund) {
    return res.status(400).json({
      data: null,
      hasError: true,
      message: "Add fund to query param with its value",
    });
  }

  req.wallet = await walletModel.findById(req.params.id);
  let wallet = req.wallet;

  wallet.currentBalance =
    Number(req.query.fund) + Number(wallet.currentBalance);

  try {
    wallet.save();
    res.status(200).json({ message: "wallet Funded successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while updating wallet",
    });
  }
};
