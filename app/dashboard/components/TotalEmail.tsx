import { createClientServer } from "@/lib/supabase/server";
import React from "react";

export default async function TotalEmail() {
	const supabase = createClientServer();

	const { error, count } = await supabase
		.from("email_list")
		.select("*", { count: "estimated", head: true });

	return (
		<div>
			<h1 className="">Total Emails 📨</h1>
			<h1 className="text-4xl font-semibold">{count}</h1>
		</div>
	);
}
