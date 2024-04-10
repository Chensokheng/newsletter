import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
	return (
		<footer className=" z-50 relative flex items-center justify-center w-full">
			<div>
				<div className=" w-20 h-1 mx-auto bg-zinc-500 rounded-full"></div>
				<div className="flex items-center gap-5 dark:text-gray-300 text-gray-800">
					<h1>@DailyWebCoding - 2024</h1>
					<ThemeToggle />
				</div>
			</div>
		</footer>
	);
}
