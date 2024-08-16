import { searchColes } from "@/lib/api/coles/queries";
import { searchWoolworths } from "@/lib/api/woolworths/queries";

export async function POST(request: Request) {
  const { search, store } = await request.json();
  console.log(search + "-" + store);
  if (store === "coles") {
    const response = await searchColes(search);
    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  } else {
    const response = await searchWoolworths(search);
    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  }
}
