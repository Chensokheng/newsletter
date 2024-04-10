import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<div className="flex items-center justify-center h-screen w-full">
			<div className="text-center space-y-5">
				<h1 className="text-5xl font-black animate-move-up">
					🙏Your link is expired!
				</h1>
				<Link href={"/"} className="text-xl underline text-blue-500">
					👉 go to home page
				</Link>
			</div>
		</div>
	);
}
