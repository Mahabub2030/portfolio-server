import { Request, Response } from "express";
import { PostServise } from "./post.serves";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServise.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostServise.getAllPosts(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await PostServise.getPostById(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
};
