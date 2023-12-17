import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { useParams, Form } from "@remix-run/react";
import { createCalendarDayData } from "~/api/data/calendar-day.server";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const date = formData.get("date");
  const entry = await createCalendarDayData(date as string);
  if (entry) return redirect("/calendar/" + date);
  else throw new Error("Could not create entry");
}

export default function DateRoute() {
  const params = useParams();

  return (
    <Card className="p-4 w-full h-[calc(100vh-2rem)]">
      <h1>No Entries found for current date {params._date}</h1>
      <Form method="POST">
        <Button type="submit">Create Your First Entry</Button>
        <input type="hidden" name="date" value={params._date} />
      </Form>
    </Card>
  );
}
