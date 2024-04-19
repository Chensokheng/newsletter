"use server";
import Challenge, { ChallengeProps } from "@/emails/challenge";
import { createClientServer } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function sendTest(payload: ChallengeProps) {
	const { error } = await resend.emails.send({
		from: "newsletter@" + process.env.DOMAIN,
		to: [process.env.TEST_MAIL!],
		subject: "DailyWebCoding's Challenge",
		react: Challenge(payload),
	});

	if (error) {
		return JSON.stringify({
			error: "Fail to send email",
		});
	}

	return JSON.stringify({
		error: null,
	});
}
export async function batchSend(payload: ChallengeProps) {
	const supabase = createClientServer();

	const { data, error: errorList } = await supabase
		.from("email_list")
		.select("id,email");

	if (!errorList) {
		const emails = data.map((value) => {
			return {
				from: "newsletter@" + process.env.DOMAIN,
				to: [value.email],
				subject: "DailyWebCoding's Challenge",
				react: Challenge({
					...payload,
					unsubscribeLink: `${process.env.NEXT_PUBLIC_SITE_URL}/api/unsubscribe/${value.id}`,
				}),
			};
		});

		const { error } = await resend.batch.send(emails);

		if (error) {
			return JSON.stringify({
				error: "Fail to send email",
			});
		}

		return JSON.stringify({
			error: null,
		});
	} else {
		return JSON.stringify({
			error: errorList,
		});
	}
}
