import prisma from "~/utils/prisma.server";

export async function createTask(data: any) {
  const entry = await prisma.task.create({
    data: data,
  });
  return entry;
}

export async function deleteTask(id: string) {
  const entry = await prisma.task.delete({
    where: { id: id },
  });
  return entry;
}
