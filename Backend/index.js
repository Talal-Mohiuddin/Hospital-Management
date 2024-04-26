import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { errorMiddleware } from "./src/middlewares/error.middileware.js";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
const renderUrl = "https://hospital-management-5z0r.onrender.com";
app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.Dashboard_URL, renderUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGOURL).then(() => {
      console.log("Database connected successfully");
    });
    app.on("error", (error) => {
      console.log("Error in connecting to database", error);
      throw error;
    });
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw error;
  }
}

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`);
  });
});

const _dirname = path.resolve();

import messageRouter from "./src/routes/message.router.js";
app.use("/message", messageRouter);

import userRouter from "./src/routes/user.router.js";
app.use("/user", userRouter);

import appointmenntRouter from "./src/routes/appointment.router.js";
app.use("/appointment", appointmenntRouter);


app.use(express.static(path.join(_dirname, "../Frontend/dist")));
app.use(express.static(path.join(_dirname, "../Dashboard/dist")));

app.get("/dashboard/*", (req, res) =>
  res.sendFile(path.join(_dirname, "../Dashboard/dist/index.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "../Frontend/dist/index.html"))
);

app.use(errorMiddleware);
export default app;
