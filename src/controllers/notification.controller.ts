import { NextFunction, Request, Response } from "express";
import { notificationModel } from "../models/notification.model";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id == "undefined" || req.params.id == "null") {
    return res.status(400).json({
      message: "Id is missing!",
    });
  }
  const check = notificationModel.findById(req.params.id);
  if (!check) {
    return res.status(400).json({
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
      message: "User Id is missing!",
    });
  }
  const check = notificationModel.find({ userId: req.params.userId });
  if (!check) {
    return res.status(400).json({
      message: "Incorrect Id !",
    });
  }

  next();
};

export const createNotification = async (req: Request, res: Response) => {
  const notification = new notificationModel(req.body);

  try {
    notification.save();
    res.status(200).json({ message: "Notification created successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message:
        error._message || "An error occured while adding favourite rental",
    });
  }
};

export const getNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const notifications = await notificationModel
      .find({
        userId: req.params.userId,
      })
      .sort({ date: "asc" });

    res.status(200).json({
      data: notifications,
      message: "Notifications retrieved successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error._message || "An error occured while getting notifications",
    });
  }
};

export const updateNotification = async (req: any, res: Response) => {
  req.notification = await notificationModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  // let notification = req.notification;

  // notification.read = req.body.read || notification.read;

  try {
    // notification.save();
    res.status(200).json({ message: "Notification Updated successfully" });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      hasError: true,
      message: error.message || "An error occured while updating Notification",
    });
  }
};
