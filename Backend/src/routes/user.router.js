import { Router } from "express";
import {
  addNewAdmin,
  getAllDoctor,
  patientLogin,
  patientRegister,
  getUserDetails,
  adminlogout,
  patientlogout,
  addNewDoctor,
} from "../controllers/user.controller.js";

import {
  isadminAuthenticated,
  ispatientAuthenticated,
} from "../middlewares/auth.js";

const 
router = Router();

router.route("/register").post(patientRegister);
router.route("/login").post(patientLogin);
router.route("/new-admin").post(isadminAuthenticated, addNewAdmin);
router.route("/doctors").get(getAllDoctor);
router.route("/admin/me").get(isadminAuthenticated, getUserDetails);
router.route("/patient/me").get(ispatientAuthenticated, getUserDetails);
router.route("/admin/logout").get(isadminAuthenticated, adminlogout);
router.route("/patient/logout").get(ispatientAuthenticated, patientlogout);
router.route('/doctor/add-new').post(isadminAuthenticated, addNewDoctor)


export default router;
