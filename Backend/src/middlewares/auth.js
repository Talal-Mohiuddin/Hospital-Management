import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./error.middileware.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.schema.js";

const isadminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.admin;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(`${req.user.role} not autherised for this resource`, 403)
    );
  }
  next();
});

const ispatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.Patient;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(`${req.user.role} not autherised for this resource`, 403)
    );
  }
  next();
});

export { isadminAuthenticated, ispatientAuthenticated };
