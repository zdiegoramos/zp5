import { Sunrise } from "@/app/sunrise";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="aspect-9/16 h-full">
				<Sunrise />
			</div>
		</div>
	);
}
