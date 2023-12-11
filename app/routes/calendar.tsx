import { useState } from "react";
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { dateToString } from "~/utils/helper-functions";

import CalendarRemix from "~/components/custom/Caleldar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader({ params} : LoaderFunctionArgs) {
  return json({ date: params.date });
}



export default function Index() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const selectedDate = loaderData.date ? new Date(loaderData.date?.split("-").join("/")) : new Date();
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  function handleSelect(date: Date) {
    setDate(date);
    navigate(`/calendar/${dateToString(date)}`); 
  }

  return (
    <div>
      <div className="flex items-start gap-4 m-4">
        <CalendarRemix selected={date} setSelected={handleSelect} />
        <Outlet />
      </div>
    </div>
  );
}
