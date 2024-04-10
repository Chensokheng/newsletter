import React from "react";
import Analytic from "./components/Analytic";

export default function page() {
	return (
		<div className="max-w-5xl mx-auto py-10  space-y-5">
			<h1 className="text-3xl font-black">Overview 📈</h1>

			<div className="h-96 border rounded-md p-5 dark:bg-[#111]">
				<h1 className="">Total Emails 📨</h1>
				<h1 className="text-4xl font-semibold">100</h1>
				<Analytic />
			</div>
			<div className=" ">
				<h1 className="text-3xl font-bold">Send Project Challenge</h1>
			</div>
		</div>
	);
}
