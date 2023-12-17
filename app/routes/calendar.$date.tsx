import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getCalendarDayData } from "~/api/data/calendar-day.server";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DeleteTaskForm from "~/components/custom/DeleteTaskForm";
import { createTask, deleteTask } from "~/api/data/task.server";

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
    console.log(entry);
    return json({ message: "We will create a new task for this date " });
  }

  async function deleteTaskAction(formData: FormData) {
    const taskId = formData.get("taskId");
    const entry = await deleteTask(taskId as string);
    return json({ message: "Task deleted", data: entry });
  }

  switch (action) {
    case "createTask":
      return await createTaskAction();
    case "deleteTask":
      return deleteTaskAction(formData);
    default:
      return null;
  }
}

export default function DateRoute() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<typeof loader>();
  const action = fetcher.formData?.get("_action");
  const hasTasks = loaderData.entry?.tasks?.length > 0;

  return (
    <Card className="p-4 w-full min-h-[calc(100vh-2rem)]">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hasTasks &&
          loaderData.entry?.tasks.map((task) => {
            return (
              <Card key={task.id} className="relative h-96">
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <div className="absolute bottom-0 p-2 w-full">
                  <DeleteTaskForm id={task.id} />
                </div>
              </Card>
            );
          })}
        <fetcher.Form method="POST">
          <Card className="flex justify-center items-center h-96">
            <Button
              value="createTask"
              name="_action"
              type="submit"
              disabled={action === "createTask"}
            >
              {hasTasks
                ? action === "createTask"
                  ? "Creating Task..."
                  : "Add Task"
                : action === "createTask"
                ? "Creating Task..."
                : "Create First Task"}
            </Button>
          </Card>
        </fetcher.Form>
      </div>
    </Card>
  );
}
