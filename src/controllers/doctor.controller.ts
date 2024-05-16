import { Request, Response } from "express";
import { doctorModel } from "../models/doctor.model";
import { appointmentModel } from "../models/appointment.model";

export const createDoctor = async (req: Request, res: Response) => {
  const doctor = new doctorModel(req.body);

  try {
    doctor.save();
    res.status(200).json({ message: "Doctor created successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message:
        error._message || "An error occured while adding favourite rental",
    });
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorModel.find();

    res
      .status(200)
      .json({ data: doctors, message: "Doctors retrieved successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error._message || "An error occured while getting doctors",
    });
  }
};
