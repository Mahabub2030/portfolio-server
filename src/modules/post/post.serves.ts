import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};
const getAllPosts = async (payload: Prisma.PostCreateInput) => {
  const result = await prisma.post.findMany();
};

export const PostServise = {
  createPost,
  getAllPosts,
};
