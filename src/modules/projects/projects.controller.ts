import { Request, Response } from "express";
import { ProjectService } from "./projects.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const projectsController = {
  createProject,
};
