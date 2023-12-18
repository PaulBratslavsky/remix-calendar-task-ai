import { Card } from "~/components/ui/card";
import DeleteTaskForm from "~/components/custom/DeleteTaskForm";
import TaskItems from "~/components/custom/TaskItems";
import AddTaskItemForm from "~/components/custom/AddTaskItemForm";
import UpdateTaskForm from "~/components/custom/UpdateTaskForm";

export default function TaskCard({ task }: { task: any }) {
  return (
    <Card className="relative min-h-96 pb-14">
      <UpdateTaskForm task={task} />
      <TaskItems items={task.taskItems} />
      <AddTaskItemForm taskId={task.id} />
      <DeleteTaskForm id={task.id} />
    </Card>
  );
}
