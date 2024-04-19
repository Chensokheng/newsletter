import React from "react";
import TotalEmail from "./components/TotalEmail";
import AnalyticWrapper from "./components/AnalyticWrapper";
import Challenge from "./components/Challenge";
export default function page() {
	return (
		<div className="max-w-5xl mx-auto py-10  space-y-5">
			<h1 className="text-3xl font-black">Overview 📈</h1>

			<div className="h-96 border rounded-md p-5 dark:bg-[#111]">
				<TotalEmail />

				<AnalyticWrapper />
			</div>
			<Challenge />
		</div>
	);
}
