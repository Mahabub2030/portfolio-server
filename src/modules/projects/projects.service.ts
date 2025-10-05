import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const result = await prisma.project.create({
    data: payload,
  });
  return result;
};
const getAllProject = async (id: number) => {
  const result = await prisma.project.findMany();
  return result;
};
const updateProject = async (id: number, data: Partial<any>) => {
  return prisma.project.update({ where: { id }, data });
};
const deleteProject = async (id: number) => {
  return prisma.project.delete({ where: { id } });
};

export const ProjectService = {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
};
