import express from "express";
import {
  checkId,
  createNews,
  getAllNews,
  getNewsById,
} from "../controllers/news.controller";

const newsRouter = express.Router();

newsRouter.route("/").get(getAllNews);
newsRouter.route("/:id").get(checkId, getNewsById);
newsRouter.route("/create").post(createNews);

export default newsRouter;
