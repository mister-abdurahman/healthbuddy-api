import express from "express";
// import passport from "passport";
import {
  checkId,
  login,
  registerUser,
  updateUser,
} from "../controllers/auth.controller";
// import passport from "../config/passport.config";

const authRouter = express.Router();

authRouter.route("/").get((req, res) => {
  res.status(200).json({ message: "Log in successfull" });
});

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(login);
authRouter.route("/:id").patch(checkId, updateUser);

// authRouter.route("/login").post(
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

export default authRouter;
