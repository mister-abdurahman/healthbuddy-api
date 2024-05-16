import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import { userModel } from "../models/user.model";
import { walletModel } from "../models/wallet.model";

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
  const check = userModel.findById(req.params.id);
  if (!check) {
    return res.status(400).json({
      hasError: true,
      message: "Incorrect Id !",
    });
  }

  next();
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    //   const {
    //     username,
    //     email,
    //     password,
    //     role,
    //     profilePicture,
    //     phoneNumber,
    //     facebookHandle,
    //     twitterHandle,
    //     linkedInHandle,
    //     streetName,
    //     city,
    //     country,
    //     postalCode,
    //     dateOfRegistration,
    //   } = req.body;
    // if (
    //   !username ||
    //   !email ||
    //   !password ||
    //   !role ||
    //   !phoneNumber ||
    //   !city ||
    //   !country ||
    //   !dateOfRegistration
    // ) {
    //   throw new Error("Ensure you fill all the inputs correctly");
    // }

    // const emailExists = await userModel.findOne({ email });
    // if (emailExists) throw new Error("Email already exists !");

    const wallet = new walletModel();
    await userModel.create({ ...req.body, walletId: wallet.id });

    wallet.save();
    res.status(201).json({ message: `User created successfully` });
    //   .json({ message: `User with email ${user.email} created successfully` });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while creating user account",
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = userModel.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: `User updated successfully` });
    //   .json({ message: `User with email ${user.email} created successfully` });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while updating user",
    });
  }
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("email and password required");
  }

  try {
    const user = await userModel.login(email, password);
    const payload = { user: { id: user._id, email: user.email } };
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.cookie("jwt", token, { httpOnly: true });
    user.password = ""; //to mask actuall password

    res.json({ user, token, message: "Login Successfull" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while logging in",
    });
  }
}
