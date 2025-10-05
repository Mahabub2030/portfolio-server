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
const getAllProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProject(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.updateProject(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(201).json(error);
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.deleteProject(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const projectsController = {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
};
