import express from "express";
import {
  checkId,
  checkOpenAppointment,
  checkUserId,
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  getUpcomingAppointment,
  updateAppointment,
} from "../controllers/appointment.controller";
import { verifyToken } from "../middlewares/verifyToken";

const appointmentRouter = express.Router();

appointmentRouter.param("id", checkId);
appointmentRouter.param("userId", checkUserId);

appointmentRouter.route("/").get(verifyToken, getAllAppointments);
appointmentRouter
  .route("/user/:userId")
  .get(verifyToken, checkUserId, getAppointmentsByUserId);
appointmentRouter
  .route("/upcoming/:userId")
  .get(verifyToken, checkUserId, getUpcomingAppointment);
appointmentRouter.route("/:id").get(verifyToken, getAppointmentById);
appointmentRouter
  .route("/")
  .post(verifyToken, checkOpenAppointment, createAppointment);
appointmentRouter.route("/:id").patch(verifyToken, updateAppointment);
appointmentRouter.route("/:id").delete(verifyToken, deleteAppointment);

export default appointmentRouter;
