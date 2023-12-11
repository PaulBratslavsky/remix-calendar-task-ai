import { Calendar } from "~/components/ui/calendar";

export default function CalendarRemix({
  selected,
  setSelected,
}: {
  readonly selected: Date | undefined;
  readonly setSelected: (date: Date) => void;
}) {
  return (
    <div className="rounded-md border p-1">
      <header className="flex justify-center items-center my-2">
        <h1 className="text-2xl">{selected?.toDateString()}</h1>
      </header>
      <Calendar mode="single" selected={selected} onSelect={setSelected as any} />
    </div>
  );
}
