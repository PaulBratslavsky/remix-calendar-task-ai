export function dateToString(date: Date) {
  return date.toLocaleString().slice(0, 10).split("/").join("-");
}
