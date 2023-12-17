import prisma from "~/utils/prisma.server";

export async function getCalendarDayData(date: string) {
  const entry = await prisma.calendarDay.findMany({
    where: { date: date },
    include: { tasks: true },
  });
  return entry[0];
}

export async function createCalendarDayData(date: string) {
  const entry = await prisma.calendarDay.create({
    data: { date: date },
  });
  return entry;
}
