import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NavigationMenu } from "@/components/navigation-menu";

export const metadata: Metadata = {
	title: "p5 Sandbox",
	description: "A playground for p5.js sketches built with Next.js",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body>
				{children}
				<NavigationMenu />
			</body>
		</html>
	);
}
