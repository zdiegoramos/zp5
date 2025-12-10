import { SunriseAnimation } from "@/app/sunrise-animation";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="h-full w-full p-4">
				<SunriseAnimation />
			</div>
		</div>
	);
}
