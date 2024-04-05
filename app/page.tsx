import FormSubscription from "@/components/FormSubscription";
import React from "react";

export default function page() {
	return (
		<div className=" relative h-screen w-full flex items-center justify-center dark:bg-grid-white/[0.05] ">
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

			<div className="text-center space-y-5">
				<h1 className="text-6xl font-black">
					Join Our{" "}
					<span className=" text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
						Newsletter
					</span>
				</h1>
				<p className="text-lg dark:text-gray-300">
					We are going to send you a project challenge every week
				</p>
				<FormSubscription />
				<p className="text-sm dark:text-gray-300">
					Join 100+ 🧑🏻‍💻 Reading Our Newsletter
				</p>
			</div>
		</div>
	);
}
