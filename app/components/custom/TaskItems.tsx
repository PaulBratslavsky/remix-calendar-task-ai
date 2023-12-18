import TaskItemInput from "~/components/custom/TaskItemInput";

export default function TaskItems({
  items,
}: {
  items: any;
}) {
  return (
    <div className="p-2 h-[175px] overflow-scroll">
      {items.map((field: any, index: string) => (
        <TaskItemInput
          key={field.id}
          field={field}
          index={index}
        />
      ))}
    </div>
  );
}
