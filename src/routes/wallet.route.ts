import express from "express";
import {
  addToWallet,
  checkId,
  checkUserId,
  createWallet,
  getAllWallets,
  getWalletById,
  getWalletByUserId,
  updateWallet,
} from "../controllers/wallet.controller";
import { verifyToken } from "../middlewares/verifyToken";

const walletRouter = express.Router();

walletRouter.route("/").get(verifyToken, getAllWallets);
walletRouter.route("/:id").get(verifyToken, checkId, getWalletById);
walletRouter
  .route("/user/:userId")
  .get(verifyToken, checkUserId, getWalletByUserId);
walletRouter.route("/create").post(verifyToken, createWallet);
walletRouter.route("/edit/:id").patch(verifyToken, checkId, updateWallet);
walletRouter.route("/addFund/:id").patch(verifyToken, checkId, addToWallet);

export default walletRouter;
