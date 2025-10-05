import express from "express";
import { projectsController } from "./projects.controller";

const router = express.Router();

router.get("/", projectsController.getAllProject);
router.post("/", projectsController.createProject);
router.patch("/:id", projectsController.updateProject);
router.delete("/:id", projectsController.deleteProject);

export const projectRouter = router;
