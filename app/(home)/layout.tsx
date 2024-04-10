import Footer from "@/components/Footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative h-[90vh] ">
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#111] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
			{children}
			<Footer />
		</div>
	);
}
