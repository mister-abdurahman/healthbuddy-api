import express from "express";
// import passport from "./config/passport.config";
import "dotenv/config";
// import flash from "express-flash";
// import session from "express-session";
import env from "./util/validateEnv";
import { userModel } from "./models/user.model";
import authRouter from "./routes/auth.route";
import { Strategy } from "passport-local";
import doctorRouter from "./routes/doctor.route";
import appointmentRouter from "./routes/appointment.route";
import walletRouter from "./routes/wallet.route";
import transactionRouter from "./routes/transaction.route";
import notificationRouter from "./routes/notification.route";
import newsRouter from "./routes/news.route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(flash()); //flash sets a message attr on our res and passport sets a success or error on it.
// app.use(
//   session({
//     secret: env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   "local",
//   new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
//     console.log("Local Strategy verify cb");
//     // call db here to verify user

//     return done(null, { id: "test id" });
//   })
// );

// passport(
//   passport,
//   (email: string) =>
//     userModel.find((user: { email: string }) => user.email === email),
//   (id: string) => userModel.find((user: { id: string }) => user.id === id)
// );
// app.use(passport.initialize());
// app.use(passport.session());

const base = "/api/v1";
// Routers
app.use(`${base}/auth`, authRouter);
app.use(`${base}/doctor`, doctorRouter);
app.use(`${base}/appointment`, appointmentRouter);
app.use(`${base}/wallet`, walletRouter);
app.use(`${base}/transaction`, transactionRouter);
app.use(`${base}/notification`, notificationRouter);
app.use(`${base}/news`, newsRouter);

app.get("/", (req, res) => {
  res.send("Hello From Health Buddy API");
});

//creating universal route for routes not defined on the server
app.use("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: `path not found on the server ${req.params}`,
  });
});

export default app;
