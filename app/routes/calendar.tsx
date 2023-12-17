import { useState } from "react";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { dateToString } from "~/utils/helper-functions";

import CalendarRemix from "~/components/custom/Caleldar";

export const meta: MetaFunction = () => {
  return [
    { title: "Get Things Done" },
    { name: "description", content: "Don't let your ADHD stop you from doing the important things" },
  ];
};

export function loader({ params }: LoaderFunctionArgs) {
  return json({ date: params.date });
}

export default function Index() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const selectedDate = loaderData.date
    ? new Date(loaderData.date?.split("-").join("/"))
    : new Date();
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  function handleSelect(date: Date) {
    if (date.toString() === "Invalid Date" || !date) return;
    setDate(date);
    navigate(dateToString(date));
  }

  return (
    <div>
      <div className="flex-row items-start gap-4 m-4 md:flex">
        <CalendarRemix selected={date} setSelected={handleSelect} />
        <Outlet />
      </div>
    </div>
  );
}
