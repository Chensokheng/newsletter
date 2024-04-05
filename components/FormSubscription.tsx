"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FormSchema = z
	.object({
		email: z.string().email({ message: "Please enter a valid email" }),
	})
	.refine(
		(data) => {
			if (
				data.email.endsWith("@gmail.com") ||
				data.email.endsWith("@outlook.com")
			) {
				return true;
			} else {
				return false;
			}
		},
		{ message: "Only support gmail,outlook.", path: ["email"] }
	);

export default function FormSubscription() {
	const [isLoading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	const subscribe = async (email: string) => {
		const res = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
		const data = await res.json();

		if (res.status !== 200) {
			throw data.message || "Fail to send email";
		} else {
			form.reset();
			return data.message || "Please check your inbox";
		}
	};

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		toast.promise(() => subscribe(data.email), {
			loading: "Sending Confirmation Email...",
			success: (data) => {
				return `${data}`;
			},
			error: (err) => {
				console.log(err);
				return err;
			},
			duration: Infinity,
			action: {
				label: "Close",
				onClick: () => {},
			},
		});
		setLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isLoading}
									type="email"
									autoFocus={true}
									placeholder="email@gmail.com"
									className={cn(
										" h-14 text-lg text-center bg-white dark:bg-zinc-900 ",
										{ "animate-pulse": isLoading }
									)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											document
												.getElementById("submit")
												?.click();
										}
									}}
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>
				<Button type="submit" id="submit" className="hidden">
					Submit
				</Button>
			</form>
		</Form>
	);
}
