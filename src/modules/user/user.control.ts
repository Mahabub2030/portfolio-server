import { Request, Response } from "express";
import { UserService } from "./user.serves";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserById(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.updateUser(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.deleteUser(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
