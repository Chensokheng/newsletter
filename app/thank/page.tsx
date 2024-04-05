import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (!data.user) {
		return redirect("/");
	}

	return (
		<div className="flex items-center justify-center w-full h-screen text-center">
			<div className="space-y-5">
				<h1 className="text-6xl font-black animate-move-up">
					Thank you for{" "}
					<span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
						subscribed
					</span>
					🙏
				</h1>
				<p className="text-xl">
					Hope you enjoy and find our newsletter useful
				</p>
			</div>
		</div>
	);
}
