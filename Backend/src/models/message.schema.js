import mongoose from "mongoose";

import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [3, "First Name should be atleast 3 characters"],
    
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [3, "Last Name should be atleast 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone:{
    type: String,
    required: [true, "Phone number is required"],
    minLength: [11, "Phone number should be atleast 10 characters"],
    maxLength: [11, "Phone number should be atmost 10 characters"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minLength: [10, "Message should be atleast 10 characters"],
  },
  }
)

export  const Message = mongoose.model("Message", messageSchema);