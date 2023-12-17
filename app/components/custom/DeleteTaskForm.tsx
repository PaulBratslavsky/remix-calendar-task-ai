import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";


export default function DeleteTaskForm({ id } : { id: string }) {
  const fetcher = useFetcher();

  const taskId = fetcher.formData?.get("taskId");
  const action = fetcher.formData?.get("_action");
  const deletingTask = action === "deleteTask" && taskId === id;

  return (
    <fetcher.Form method="POST">
      <Button
        value="deleteTask"
        name="_action"
        type="submit"
        className="w-full"
        disabled={deletingTask}
      >
        {deletingTask ? "Deleting Task..." : "Delete Task"}
      </Button>
      <input type="hidden" name="taskId" value={id} />
    </fetcher.Form>
  );
}
