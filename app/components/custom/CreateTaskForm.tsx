import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useFetcher } from "@remix-run/react";
export default function CreateTaskForm({ hasTasks }: { hasTasks: boolean }) {
  const fetcher = useFetcher();
  const action = fetcher.formData?.get("_action");

  return (
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
  );
}
