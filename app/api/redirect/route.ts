import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	console.log(url.hash, "+====");
	console.log(url.searchParams.has("error"));
	return Response.json({ ok: "200" });
	// return NextResponse.redirect(`${origin}/thank`);
}
