"use client";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { batchSend, sendTest } from "../actions";
import { ChallengeProps } from "@/emails/challenge";
import { toast } from "sonner";

const FormSchema = z.object({
	title: z.string().min(2, {
		message: "title must be at least 2 characters.",
	}),
	description: z.string().min(10, {
		message: "descption must be at least 10 characters.",
	}),
	features: z.string().min(10, {
		message: "features must be at least 10 characters.",
	}),
	youtubeLink: z.string().url({
		message: "Invalid link",
	}),
});

export default function ChallengeForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
			description: "",
			features: "",
			youtubeLink: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.loading("Sending..", {
			id: "sendtest",
		});
		const res = await batchSend({
			...data,
			unsubscribeLink: "http://localhost:3000",
		});
		const { error } = JSON.parse(res);
		toast.dismiss("sendtest");
		if (error) {
			toast.error(error);
		} else {
			toast.success("Email has been sent.");
		}
	}
	async function handleSendTest() {
		form.trigger();
		if (form.formState.isValid) {
			const value = form.getValues() as unknown as ChallengeProps;
			toast.loading("Sending..", {
				id: "sendtest",
			});
			const res = await sendTest({
				...value,
				unsubscribeLink: "http://localhost:3000",
			});
			const { error } = JSON.parse(res);
			toast.dismiss("sendtest");
			if (error) {
				toast.error(error);
			} else {
				toast.success("Please check your inbox");
			}
		}
	}

	return (
		<div className="space-y-5 ">
			<h1 className="text-3xl font-bold">Send Project Challenge</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="project title"
										className="h-14 text-xl"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="description"
										className="h-56 text-xl"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="features"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className=" h-56 text-xl"
										placeholder="features"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="youtubeLink"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="h-14 text-xl"
										placeholder="youtube link"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="flex-1 py-7 text-xl w-full">
						Publish
					</Button>
				</form>
			</Form>
			<div className="flex gap-2">
				<Button
					className="flex-1 py-7 text-xl"
					variant="outline"
					onClick={handleSendTest}
				>
					Send Test
				</Button>
			</div>
		</div>
	);
}
