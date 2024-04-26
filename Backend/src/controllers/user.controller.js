import { User } from "../models/user.schema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.middileware.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, dob, nic, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  let newUser = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    nic,
    role,
  });
  await newUser.save();
  generateToken(newUser, "User registered successfully", 201, res);
});

const patientLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("user with this role not found", 401));
  }
  generateToken(user, "User login successfully", 200, res);
});

const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, dob, nic } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(`${user.role} with This Email Already Exists `, 400)
    );
  }
  let newUser = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    nic,
    role: "admin",
  });
  await newUser.save();
  res
    .status(201)
    .json({ message: "Admin registered successfully", success: true });
});

const getAllDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

const adminlogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("admin", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Admin logout successfully",
    });
});

const patientlogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("Patient", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Patient logout successfully",
    });
});

const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload an image", 400));
  }
  const { docAvatar } = req.files;
  const formats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!formats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format Not Supported", 400));
  }
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    nic,
    doctorDepartment,
    gender,
  } = req.body;

  if (!firstName) {
    return next(new ErrorHandler("First Name is required", 400));
  }
  if (!lastName) {
    return next(new ErrorHandler("Last Name is required", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }
  if (!phone) {
    return next(new ErrorHandler("Phone is required", 400));
  }
  if (!dob) {
    return next(new ErrorHandler("Date of Birth is required", 400));
  }
  if (!nic) {
    return next(new ErrorHandler("NIC is required", 400));
  }
  if (!doctorDepartment) {
    return next(new ErrorHandler("Doctor Department is required", 400));
  }
  if (!gender) {
    return next(new ErrorHandler("Gender is required ", 400));
  }

  const isregistered = await User.findOne({ email });
  if (isregistered) {
    return next(
      new ErrorHandler(
        `${isregistered.role} with this email already exists`,
        400
      )
    );
  }

  const cloudnaryResponse = await cloudinary.v2.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudnaryResponse || cloudnaryResponse.error) {
    console.error(cloudnaryResponse.error || "Error in uploading image");
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    nic,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudnaryResponse.public_id,
      url: cloudnaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Doctor registered successfully",
    doctor,
  });
});

export {
  patientRegister,
  patientLogin,
  addNewAdmin,
  getAllDoctor,
  getUserDetails,
  adminlogout,
  patientlogout,
  addNewDoctor,
};
