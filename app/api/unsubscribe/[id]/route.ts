import supabaseAdmin from "@/lib/supabase/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;

	const supabase = supabaseAdmin;
	const { error } = await supabase.auth.admin.deleteUser(id);
	if (!error) {
		redirect("/unsubscribe");
	} else {
		redirect("/error");
	}
}
