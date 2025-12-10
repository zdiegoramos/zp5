"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pages = [
	{ name: "Home", path: "/" },
	{ name: "Night Sky", path: "/night-sky" },
	{ name: "Rotating Blocks", path: "/rotating-blocks" },
	{ name: "Sunrise", path: "/sunrise" },
	{ name: "Sunrise Animation", path: "/sunrise-animation" },
	{ name: "Sunrise with Trees", path: "/sunrise-with-trees" },
];

export function NavigationMenu() {
	return (
		<div className="fixed right-4 bottom-4 z-50">
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
					<Menu className="size-6" />
					<span className="sr-only">Open navigation menu</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					{pages.map((page) => (
						<DropdownMenuItem asChild key={page.path}>
							<Link className="w-full cursor-pointer" href={page.path}>
								{page.name}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
