"use client";
import { createClientBroswer } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

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

export default function AuthComponent() {
	return (
		<div className=" flex items-center justify-center w-ful h-screen">
			<AuthForm />
		</div>
	);
}

const FormSchema = z.object({
	email: z.string().email({
		message: "Email is invalid",
	}),
	password: z.string().min(8, "password is invalid"),
});

export function AuthForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const supabase = createClientBroswer();
		const { error } = await supabase.auth.signInWithPassword(data);
		if (error) {
			toast.error(error.message);
		} else {
			router.refresh();
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-96 space-y-6"
			>
				<h1 className="text-4xl font-black text-center">
					Welcome back 👋
				</h1>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="email"
									{...field}
									type="email"
									className="h-14 text-lg bg-white dark:bg-zinc-900"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="password"
									{...field}
									type="password"
									className="h-14 text-lg bg-white dark:bg-zinc-900"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button type="submit" className="w-full py-6">
						Login
					</Button>
				</div>
			</form>
		</Form>
	);
}
