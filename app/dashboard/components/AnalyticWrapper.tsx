import React from "react";
import Analytic from "./Analytic";
import { createClientServer } from "@/lib/supabase/server";
import { generateDatesObjectForCurrentMonth } from "@/lib/utils";

export default async function AnalyticWrapper() {
	const supabase = createClientServer();

	let { data } = await supabase.rpc("get_email_chart_data");

	const datesForCurrentMonth = generateDatesObjectForCurrentMonth();

	data?.forEach((email) => {
		datesForCurrentMonth[email.truncated_date] = email.count;
	});

	return <Analytic data={datesForCurrentMonth} />;
}
