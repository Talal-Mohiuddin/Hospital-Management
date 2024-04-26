import { Message } from "../models/message.schema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.middileware.js";


const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const newMessage = new Message({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  await newMessage.save();
  return res
    .status(201)
    .json({ message: "Message sent successfully", success: true });
});

const  getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  return res.status(200).json({ messages, success: true });
});


export { sendMessage, getAllMessages };
