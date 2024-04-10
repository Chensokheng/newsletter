import React from "react";
import AuthComponent from "./components/AuthComponent";
import { createClientServer } from "@/lib/supabase/server";

export default async function page() {
	const supabase = createClientServer();
	const { data } = await supabase.auth.getUser();

	return (
		<div>
			{data.user ? <h1>Welcome to Dashboard</h1> : <AuthComponent />}
		</div>
	);
}
