import { LinearLoginCodeEmail } from "@/emails";
import supabaseAdmin from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { Resend } from "resend";

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
	const verifyLink = data.properties.action_link;
	console.log(verifyLink);
	try {
		const emailRes = await sendMail(verifyLink, email);
		return Response.json({ message: "Please check your inbox", emailRes });
	} catch (error) {
		return Response.json({ message: "Fail to send email" });
	}
}

async function generateMagicLink(email: string) {
	const supabase = supabaseAdmin;
	return await supabase.auth.admin.generateLink({
		type: "magiclink",
		email: email,
		options: {
			redirectTo: "http://localhost:3000/thank",
		},
	});
}

async function sendMail(verifyLink: string, email: string) {
	const resend = new Resend(process.env.RESEND_KEY);
	return await resend.emails.send({
		from: "Acme <noreply@daertam.com>",
		to: [email],
		subject: "Confirm Subscription",
		react: LinearLoginCodeEmail({ verifyLink }),
	});
}
