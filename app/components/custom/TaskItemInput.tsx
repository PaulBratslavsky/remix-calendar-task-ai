import { useState } from "react";
import { useForm} from "react-hook-form";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
} from "~/components/ui/form";
import { CustomInput } from "./CustomInput";
import { Checkbox } from "~/components/ui/checkbox";

export default function TaskItemInput({ field, index, fields }: any) {
  console.dir(field, { depth: null });
  const [checked, setChecked] = useState(field.completed);

  const form = useForm({
    defaultValues: {
      title: field.title,
      completed:  field.completed,
    },
  });

  return (
    <Form {...form}>
      <div className="relative">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Checkbox
          name="completed"
          className="absolute top-3 right-2 z-10"
          checked={field.completed}
          onCheckedChange={() => {
            field.completed = !field.completed;
            setChecked(!checked);
          }}
        />
      </div>
    </Form>
  );
}
