import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (!data.user) {
		return redirect("/");
	}

	return (
		<div>
			<h1>Thank you for subscribe</h1>
		</div>
	);
}
