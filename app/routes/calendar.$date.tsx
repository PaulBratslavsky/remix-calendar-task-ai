import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Card } from "~/components/ui/card";

export async function loader({ params }: { params: { date: string } }) {
  const prisma = new PrismaClient();

  const date = params.date;

  const entry = await prisma.calendarDay.findMany({
    where: { date: date },
  });

  console.dir(entry, { depth: null });
  return json({ entry: entry[0] });
}
export default function DateRoute() {
  const { date } = useParams();
  const data = useLoaderData<typeof loader>();

  if (!data.entry) return <div className="p-4">no entry found</div>;
  
  console.log(data.entry);

  return <Card className="p-4 w-full h-[calc(100vh-2rem)]">
    <h1>{date}</h1>
    <p>{data.entry?.id}</p>
  </Card>;
}
