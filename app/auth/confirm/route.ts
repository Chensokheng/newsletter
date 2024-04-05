import supabaseAdmin from "@/lib/supabase/admin";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";
	const email = searchParams.get("email");
	const id = searchParams.get("id");

	if (token_hash && type && email && id) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.delete({ name, ...options });
					},
				},
			}
		);

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			const { error: errInsert } = await supabaseAdmin
				.from("email_list")
				.insert({ id, email });
			console.log(errInsert);
			if (!errInsert) {
				return NextResponse.redirect(`${origin}${next}`);
			} else {
				return NextResponse.redirect(`${origin}/error`);
			}
		}
	}

	// return the user to an error page with some instructions
	const errorPath = "/error";
	return NextResponse.redirect(`${origin}${errorPath}`);
}
