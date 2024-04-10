import { ConfirmSubscription } from "@/emails";
import supabaseAdmin from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";

import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(3, "86400s"),
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
	const ip = req.ip ?? "127.0.0.1";
	const { remaining } = await ratelimit.limit(ip);

	if (remaining === 0) {
		return new Response(
			JSON.stringify({
				message:
					"You are requesting too much. Please check your email inbox",
			}),
			{
				status: 409,
				headers: {
					"X-RateLimit-Remaining": remaining.toString(),
				},
			}
		);
	} else {
		const { origin } = new URL(req.url);

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
		const { data: existEmail } = await supabaseAdmin
			.from("email_list")
			.select("email")
			.eq("email", email)
			.single();
		if (existEmail) {
			return NextResponse.json(
				{
					message: "Email is already subscribed.",
				},
				{
					status: 400,
				}
			);
		}

		const { data, error } = await generateMagicLink(email, origin);
		if (error) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 400,
				}
			);
		} else {
			const emailRes = await sendMail(data.properties.action_link, email);

			if (emailRes.error) {
				return NextResponse.json(
					{
						message: "Fail to send email",
					},
					{
						status: 400,
					}
				);
			} else {
				return Response.json({ message: "Please check your inbox" });
			}
		}
	}
}

async function generateMagicLink(email: string, origin: string) {
	const supabase = supabaseAdmin;
	return await supabase.auth.admin.generateLink({
		type: "magiclink",
		email: email,
		options: {
			redirectTo: origin + "/check",
		},
	});
}

async function sendMail(verifyLink: string, email: string) {
	const resend = new Resend(process.env.RESEND_KEY);
	return await resend.emails.send({
		from: "noreply@daertam.com",
		to: [email],
		subject: "Confirm Subscription",
		react: ConfirmSubscription({ verifyLink }),
	});
}
