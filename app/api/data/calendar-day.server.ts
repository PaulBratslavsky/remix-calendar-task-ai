import prisma from "~/utils/prisma.server";

export async function getCalendarDayData(date: string) {
  const entry = await prisma.calendarDay.findMany({
    where: { date: date },
    include: { tasks: true },
  });
  return entry[0];
}
