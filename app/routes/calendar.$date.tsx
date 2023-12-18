import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCalendarDayData } from "~/api/data/calendar-day.server";

import { Card } from "~/components/ui/card";
import { createTask, deleteTask, updateTask } from "~/api/data/task.server";
import { createTaskItem } from "~/api/data/task-item.server";
import TaskCard from "~/components/custom/TaskCard";
import InitDayForm from "~/components/custom/CreateTaskForm";

export async function loader({ params }: { params: { date: string } }) {
  const date = params.date;
  const entry = await getCalendarDayData(date);
  if (!entry) return redirect("/calendar/" + date + "/create-entry");
  return json({ entry });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");
  const date = params.date;

  async function createTaskAction() {
    const entry = await createTask({
      title: "New Task",
      calendarDay: {
        connect: { date: date },
      },
    });
    return json({
      message: "We will create a new task for this date.",
      data: entry,
    });
  }

  async function deleteTaskAction(formData: FormData) {
    const taskId = formData.get("taskId");
    const entry = await deleteTask(taskId as string);
    return json({ message: "Task deleted", data: entry });
  }

  async function updateTaskAction(formData: FormData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const taskId = formData.get("taskId");

    const data = {
      title: title as string,
      description: description as string,
    };

    const entry = await updateTask(taskId as string, data);
    return json({ message: "Task Updated", data: entry });
  }

  async function createTaskItemAction(formData: FormData) {
    const taskId = formData.get("taskId");
    const title = formData.get("title");
    const data = { title: title as string };
    const entry = await createTaskItem(taskId as string, data);
    return json({ message: "Task Item Created", data: entry });
  }

  switch (action) {
    case "createTask":
      return await createTaskAction();
    case "deleteTask":
      return deleteTaskAction(formData);
    case "updateTask":
      return updateTaskAction(formData);
    case "createTaskItem":
      return createTaskItemAction(formData);
    default:
      return null;
  }
}

export default function DateRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const hasTasks = loaderData.entry?.tasks?.length > 0;

  return (
    <Card className="p-4 w-full min-h-[calc(100vh-2rem)]">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hasTasks &&
          loaderData.entry?.tasks.map((task: any) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        <InitDayForm hasTasks={hasTasks} />
      </div>
    </Card>
  );
}
