"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

function sketch({
	canvasElement,
	draw,
}: {
	canvasElement: HTMLDivElement;
	draw: (p: p5) => void;
}) {
	return (p: p5) => {
		p.setup = () => {
			const width = canvasElement.clientWidth;
			const height = canvasElement.clientHeight;
			p.createCanvas(width, height);
		};

		p.windowResized = () => {
			const width = canvasElement.clientWidth;
			const height = canvasElement.clientHeight;
			p.resizeCanvas(width, height);
		};

		p.draw = () => draw(p);
	};
}

export function P5Canvas({ draw }: { draw: (p: p5) => void }) {
	const p5CanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const p5Current = p5CanvasRef.current;

		if (p5Current === null) {
			return;
		}

		// Dynamically import p5 only on the client side
		import("p5").then((p5Module) => {
			const p5Instance = new p5Module.default(
				sketch({ canvasElement: p5Current, draw }),
				p5Current,
			);

			return () => {
				p5Instance.remove();
			};
		});
	}, [draw]);

	return <div className="h-full w-full" ref={p5CanvasRef} />;
}
