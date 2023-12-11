import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getCalendarDayData } from "~/api/data/calendar-day.server"
import { Card } from "~/components/ui/card";

export async function loader({ params }: { params: { date: string } }) {
  const date = params.date;
  const entry = await getCalendarDayData(date);
  return json({ entry });
}

export default function DateRoute() {
  const { date } = useParams();
  const data = useLoaderData<typeof loader>();
  
  if (!data.entry) return <div className="p-4">no entry found</div>;

  return (
    <Card className="p-4 w-full h-[calc(100vh-2rem)]">
      <h1>{date}</h1>
      <p>{data.entry?.id}</p>
      {data.entry?.tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </Card>
  );
}
