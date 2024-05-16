// import { Strategy } from "passport-local";
// import bcrypt from "bcrypt";
// import { PassportStatic } from "passport";
// import { userModel } from "../models/user.model";
// import passport from "passport";

// passport.use(
//   new Strategy(function (email, password, done) {
//     console.log("ss");
//     userModel.findOne({ email: email }, function (err: any, user: any) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect email." });
//       }
//       //   if (!user.validPassword(password)) {
//       if (!userModel.validPassword(email, password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser(function (user: any, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   userModel.findById(id, function (err: any, user: any) {
//     done(err, user);
//   });
// });

// // function initializePassport(
// //   passport: PassportStatic,
// //   getUserByEmail: any,
// //   getUserById: any
// // ) {
// //   const authenticateUser = async (
// //     email: string,
// //     password: string,
// //     done: any
// //   ) => {
// //     const user = getUserByEmail(email);

// //     if (user == null) {
// //       return done(null, false, { message: "No email with that user" });
// //     }

// //     try {
// //       if (await bcrypt.compare(password, user.password)) {
// //         return done(null, user);
// //       }
// //     } catch (error) {
// //       return done(error);
// //     }
// //   };

// //   passport.use(new Strategy({ emailField: "email" }, authenticateUser));

// //   passport.serializeUser((user: any, done) => done(null, user.id));
// //   passport.deserializeUser((id, done) => {
// //     return done(null, getUserById(id));
// //   });
// // }

// export default passport;
