import express from "express";
import { projectsController } from "./projects.controller";

const router = express.Router();

router.post("/", projectsController.createProject);

export const projectRouter = router;
