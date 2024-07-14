import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  accountName: {
    type: String,
    unique: [true, "Account Name Already Exists"],
    required: [true, "Account Name is Required"],
  },
  email: {
    type: String,
  },
  referalCode: {
    type: Number,
  },
  phoneNumber: {
    type: String,
    unique: [true, "phone Number is uniqie"],
    required: [true, "Phoned Number is Required"],
  },
  sex: {
    type: String,
    required: [true, "Sex is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  withdrawalPassword: {
    type: String,
    required: [true, "Withdrawal Password is Required"],
  },
  badge: {
    type: String,
    required: true,
    default: "bronze",
  },
  role: {
    type: String,
    default: "user",
  },
  pwd: { type: String },
  request: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  previous: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//Encrypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("withdrawalPassword")) {
    next();
  }
  this.withdrawalPassword = await bcrypt.hash(this.withdrawalPassword, 10);
});

//Generate password reset token
userSchema.methods.getRessetPasswordToken = function () {
  //Gen token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash and set to resetPassword Token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

//because this route is called every time a user signIn we need to make this additional check
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
