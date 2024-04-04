import supabaseAdmin from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email } = (await req.json()) as { email: string };
	if (!email) {
		return NextResponse.json(
			{
				message: "Email is required.",
			},
			{
				status: 422,
			}
		);
	} else if (
		!email.endsWith("@gmail.com") &&
		!email.endsWith("@outlook.com")
	) {
		return NextResponse.json(
			{
				message: "Support only @gmail,@outlook",
			},
			{
				status: 400,
			}
		);
	}
	// check if email is already exist
	// gernate magiclink
	const { data, error } = await generateMagicLink(email);
	if (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 400,
			}
		);
	}

	// send email to user

	return Response.json({ data });
}

async function generateMagicLink(email: string) {
	const supabase = supabaseAdmin;
	return await supabase.auth.admin.generateLink({
		type: "magiclink",
		email: email,
		options: {
			redirectTo: "http://localhost:3000",
		},
	});
}
