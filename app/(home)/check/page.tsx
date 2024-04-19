"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		const hashValue = window.location.hash;
		if (hashValue.startsWith("#error") && hashValue.endsWith("expired")) {
			router.replace("/expired");
		} else if (hashValue.startsWith("#error")) {
			router.replace("/error");
		} else {
			router.replace("/thank");
		}
		// eslint-disable-next-line
	}, []);

	return <div className="h-full"></div>;
}
