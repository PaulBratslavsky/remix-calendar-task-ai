import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { CustomInput } from "~/components/custom/CustomInput";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { AddIcon } from "~/components/icons/AddIcon";

export default function AddTaskItemForm({ taskId }: { taskId: string }) {
  const fetcher = useFetcher();

  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (fetcher.state === "submitting") {
      form.reset({ title: "" });
    }
  }, [fetcher.state, form]);

  return (
    <Form {...form}>
      <fetcher.Form method="POST" className="relative mx-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput {...field} placeholder="Add step"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="w-8 h-8 p-0 float-right absolute top-0 right-0 text-white hover:text-white bg-green-700 hover:bg-green-600"
          name="_action"
          value="createTaskItem"
        >
          <AddIcon />
        </Button>
        <input type="hidden" name="taskId" value={taskId} />
      </fetcher.Form>
    </Form>
  );
}
