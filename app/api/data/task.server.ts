import { Prisma } from "@prisma/client";
import prisma from "~/utils/prisma.server";

export async function createTask(data: any) {
  const entry = await prisma.task.create({
    data: data,
  });
  return entry;
}

export async function deleteTask(id: string) {
  try {
    const entry = await prisma.task.delete({ where: { id: id } });
    return entry;
  } catch (error) {
    const prismaError = error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
    if (prismaError) return error.message;
    throw new Error("Error deleting task");
  }
}
