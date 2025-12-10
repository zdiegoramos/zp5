import { Tiles } from "@/app/tiles/tiles";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="aspect-square h-full">
				<Tiles />
			</div>
		</div>
	);
}
