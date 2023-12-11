import { dateToString } from "~/utils/helper-functions";

export async function loader() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/calendar/" + dateToString(new Date()),
    },
  });
}
