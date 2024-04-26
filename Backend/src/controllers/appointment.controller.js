import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.middileware.js";

import { Appointment } from "../models/appointmennt.schema.js";
import { User } from "../models/user.schema.js";

const appointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Plz Fill Full Form", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDerpartment: department,
  });

  if (isConflict?.length === 0) {
    return next(new ErrorHandler("Doctor Not Found!", 404));
  }
  if (isConflict?.length > 1) {
    return next(
      new ErrorHandler("Doctor Conflict Plz contact trough email", 400)
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const newAppointment = new Appointment({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  await newAppointment.save();

  return res
    .status(201)
    .json({ message: "Appointment Requested", success: true, newAppointment });
});

const getallappointment = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  return res.status(200).json({ appointments, success: true });
});

const appointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Status Updated",
  });
});

const deleteAppointment  = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted",
  });
});

export { appointment, getallappointment, appointmentStatus, deleteAppointment };
