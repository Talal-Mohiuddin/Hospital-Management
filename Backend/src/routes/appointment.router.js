import { Router } from "express";
import {appointment, appointmentStatus, deleteAppointment, getallappointment} from '../controllers/appointment.controller.js'

import {ispatientAuthenticated,isadminAuthenticated} from '../middlewares/auth.js'

const router = Router();

router.route('/new').post(ispatientAuthenticated,appointment)

router.route('/allappointments').get(isadminAuthenticated,getallappointment)

router.route('/approvedstatus/:id').put(isadminAuthenticated,appointmentStatus)

router.route('/deleteappointment/:id').delete(isadminAuthenticated,deleteAppointment)





export default router;