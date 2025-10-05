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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const result = await PostServise.getAllPosts({ page, limit, search });
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

const updatePost = async (req: Request, res: Response) => {
  const post = await PostServise.updatePost(Number(req.params.id), req.body);
  res.json(post);
};
const deletePost = async (req: Request, res: Response) => {
  await PostServise.deletePost(Number(req.params.id));
  res.json({ message: "Post deleted" });
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
