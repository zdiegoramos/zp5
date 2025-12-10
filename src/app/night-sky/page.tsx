import { NightSky } from "@/app/night-sky";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="h-[400px] w-[400px]">
				<NightSky />
			</div>
		</div>
	);
}
