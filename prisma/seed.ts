import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createData() {
  try {
    // Create a CalendarDay entry for December 10th, 2023

    const calendarDay = await prisma.calendarDay.create({
      data: {
        date: "12-10-2023",
        tasks: {
          create: [
            {
              title: "Task 1",
              taskItems: {
                create: [{ title: "Item 1 of Task 1" }],
              },
            },
            {
              title: "Task 2",
              taskItems: {
                create: [{ title: "Item 1 of Task 2" }],
              },
            },
          ],
        },
      },
      include: {
        tasks: {
          include: {
            taskItems: true,
          },
        },
      },
    });

    console.log("Created CalendarDay with tasks:", calendarDay);
  } catch (error) {
    console.error("Error creating data:", error);
  }
}

createData();
