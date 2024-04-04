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
import { createClientBroswer } from "@/lib/supabase/browser";

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
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const supabase = createClientBroswer();
		const { error } = await supabase.auth.signInWithOtp({
			email: data.email,
			options: {
				emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/thank",
			},
		});
		if (!error) {
			toast.success("Please check your inbox");
		}
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
									type="email"
									placeholder="email@gmail.com"
									className=" h-14 text-lg text-center bg-zinc-900"
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
