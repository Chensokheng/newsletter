import Footer from "@/components/Footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative h-[90vh] ">
			{children}
			<Footer />
		</div>
	);
}
