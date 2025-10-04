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

export const PostServise = {
  createPost,
  getAllPosts,
};
