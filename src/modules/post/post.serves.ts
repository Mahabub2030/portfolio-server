import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};
const getAllPosts = async (payload: Prisma.PostCreateInput) => {
  const results = await prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      excerpt: true,
      tags: true,
    },
  });
  return results;
};

const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: { author: true },
  });
  return result;
};
const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
};
const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};
export const PostServise = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
