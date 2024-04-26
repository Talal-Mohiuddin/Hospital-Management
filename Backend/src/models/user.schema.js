import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [3, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [3, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [11, "Phone number should be atleast 10 characters"],
    maxLength: [11, "Phone number should be atmost 10 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should be atleast 8 characters"],
    select: false,
  },
  nic: {
    type: String,
    required: [true, "NIC is required"],
    minLength: [13, "NIC should contain 13 characters"],
    maxLength: [13, "NIC should contain 13 characters"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "Doctor", "Patient"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIERY,
  });
};

export const User = mongoose.model("User", userSchema);
