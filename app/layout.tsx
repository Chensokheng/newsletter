import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Daily Newsletter",
	description:
		'Subscribe to "Get Inspired Weekly" for a curated selection of project ideas delivered to your inbox every week, spanning tech, design, entrepreneurship, and more. Stay ahead of the curve and fuel your creativity with actionable insights and resources to turn inspiration into action',

	metadataBase: new URL("https://daily-newsletter.vercel.app/"),

	authors: {
		name: "chensokheng",
	},

	openGraph: {
		title: "Daily Newsletter",
		description:
			'Subscribe to "Get Inspired Weekly" for a curated selection of project ideas delivered to your inbox every week, spanning tech, design, entrepreneurship, and more. Stay ahead of the curve and fuel your creativity with actionable insights and resources to turn inspiration into action',
		url: "https://daily-newsletter.vercel.app/",
		siteName: "Daily Newsletter",
		images: "/og.png",
		type: "website",
	},
	keywords: ["daily web coding", "chensokheng", "dailywebcoding"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"antialiased dark:bg-grid-white/[0.05]  bg-grid-black/[0.02]",
					bricolageGrotesque.className
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}

					<Toaster richColors position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
