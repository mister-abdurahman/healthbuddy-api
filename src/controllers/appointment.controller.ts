import { NextFunction, Request, Response } from "express";
import { appointmentModel } from "../models/appointment.model";
import { userModel } from "../models/user.model";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id == "undefined" || req.params.id == "null") {
    return res.status(400).json({
      hasError: true,
      message: "Id is missing!",
    });
  }
  if (req.params.id == "skip") {
    return res.status(200).json({
      message: "Nothing to return !",
    });
  }
  const check = appointmentModel.findById(req.params.id);
  if (!check) {
    return res.status(400).json({
      hasError: true,
      message: "Incorrect Id !",
    });
  }

  next();
};

export const checkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.userId == "undefined" || req.params.userId == "null") {
    return res.status(400).json({
      hasError: true,
      message: "Id is missing!",
    });
  }
  const check = userModel.findById(req.params.userId);
  if (!check) {
    return res.status(400).json({
      hasError: true,
      message: "Enter correct User Id !",
    });
  }
  next();
};

export const checkOpenAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const openAppointment = await appointmentModel.findOne({ completed: false });
  if (openAppointment) {
    return res.status(400).json({
      data: null,
      hasError: true,
      message:
        "You need to close/cancel your pending appointment before creating a new one",
    });
  }

  next();
};

export const getAllAppointments = async (req: Request, res: Response) => {
  const appointments = await appointmentModel.find();

  try {
    res.status(200).json({
      data: appointments,
      message: "Fetched all Appointments successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching appointments",
    });
  }
};
export const getAppointmentsByUserId = async (req: Request, res: Response) => {
  const appointments = await appointmentModel.find({
    userId: req.params.userId,
  });

  try {
    res.status(200).json({
      data: appointments,
      message: "Fetched all User Appointments successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message:
        error.message || "An error occured while fetching user appointments",
    });
  }
};
export const getUpcomingAppointment = async (req: Request, res: Response) => {
  const appointment = await appointmentModel.findOne({
    userId: req.params.userId,
    completed: false,
  });

  try {
    res.status(200).json({
      data: appointment,
      message: `${
        !appointment
          ? "No Upcoming Appointment"
          : "Fetched Upcoming Appointment successfully"
      }`,
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message:
        error.message || "An error occured while fetching upcoming appointment",
    });
  }
};
export const getAppointmentById = async (req: Request, res: Response) => {
  // if (req.params.id === "0") throw new Error("Invalid Id !!");
  const appointment = await appointmentModel.findById(req.params.id);

  try {
    res.status(200).json({
      data: appointment,
      message: "Fetched Appointment successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while fetching appointment",
    });
  }
};
export const createAppointment = async (req: Request, res: Response) => {
  const appointment = new appointmentModel(req.body);

  try {
    appointment.save();
    res.status(200).json({ message: "Appointment created successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while creating appointment",
    });
  }
};

export const updateAppointment = async (req: any, res: Response) => {
  //   let appointment = await appointmentModel.findById(req.params.id);
  //   appointment = { ...appointment, ...req.body };

  const updated = await appointmentModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  // let appointment = req.appointment;

  // appointment.startDate = req.body.startDate || appointment.startDate;
  // appointment.endDate = req.body.endDate || appointment.endDate;
  // appointment.reason = req.body.reason || appointment.reason;
  // appointment.doctorId = req.body.doctorId || appointment.doctorId;
  // appointment.vitals = req.body.vitals || appointment.vitals;
  // appointment.completed = req.body.completed || appointment.completed;
  // appointment.doctorNote = req.body.doctorNote || appointment.doctorNote;

  //   blog.title = req.body.title;
  //   blog.description = req.body.description;
  //   blog.body = req.body.body;
  //   blog.tags = req.body.tags;

  try {
    // appointment.save();
    res.status(200).json({ message: "Appointment Updated successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while updating appointment",
    });
  }
};
export const deleteAppointment = async (req: any, res: Response) => {
  try {
    await appointmentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Appointment Deleted successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while deleting appointment",
    });
  }
};
