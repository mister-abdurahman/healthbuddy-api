import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedInHandle: string;
  address: string;
  state: string;
  login: any;
  walletId: string;
}

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profilePicture: { type: String, required: false },
    facebookHandle: { type: String, required: false },
    twitterHandle: { type: String, required: false },
    linkedInHandle: { type: String, required: false },
    address: { type: String, required: true },
    state: { type: String, required: true },
    walletId: { type: String, required: true },
  },
  { timestamps: true }
);

// The Pre-hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    delete user.password;
    if (auth) return user;
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

// valid password
userSchema.statics.validPassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    delete user.password;
    if (auth) return true;
  }
  return false;
};

export const userModel: any = mongoose.model<user>("user", userSchema);
