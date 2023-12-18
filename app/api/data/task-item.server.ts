import { Prisma } from "@prisma/client";
import prisma from "~/utils/prisma.server";

export async function createTaskItem(taskId: string, data: any) {
  const entry = await prisma.taskItem.create({
    data: {
      ...data,
      task: {
        connect: {
          id: taskId,
        },
      },
    },
  });
  return entry;
}

export async function updateTaskItem(id: string, data: any) {
  try {
    const entry = await prisma.taskItem.update({
      where: { id: id },
      data: data,
    });
    return entry;
  } catch (error) {
    const prismaError =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025";
    if (prismaError) return error.message;
    throw new Error("Error updating task");
  }
}

export async function deleteTaskItem(id: string) {
  try {
    const entry = await prisma.taskItem.delete({ where: { id: id } });
    return entry;
  } catch (error) {
    const prismaError =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025";
    if (prismaError) return error.message;
    throw new Error("Error deleting task");
  }
}
