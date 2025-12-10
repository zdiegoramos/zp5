"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

function sketch({
	canvasElement,
	draw,
	setup,
}: {
	canvasElement: HTMLDivElement;
	draw: (p: p5) => void;
	setup?: (p: p5) => void;
}) {
	return (p: p5) => {
		p.setup = () => {
			const width = canvasElement.getBoundingClientRect().width;
			const height = canvasElement.getBoundingClientRect().height;
			p.createCanvas(width, height);
			if (setup) {
				setup(p);
			}
		};

		p.windowResized = () => {
			const width = canvasElement.getBoundingClientRect().width;
			const height = canvasElement.getBoundingClientRect().height;
			p.resizeCanvas(width, height);
		};

		p.draw = () => draw(p);
	};
}

export function P5Canvas({
	draw,
	setup,
	...props
}: React.ComponentProps<"div"> & {
	draw: (p: p5) => void;
	setup?: (p: p5) => void;
}) {
	const p5CanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const p5Current = p5CanvasRef.current;

		if (p5Current === null) {
			return;
		}

		// Dynamically import p5 only on the client side
		import("p5").then((p5Module) => {
			const p5Instance = new p5Module.default(
				sketch({ canvasElement: p5Current, draw, setup }),
				p5Current,
			);

			return () => {
				p5Instance.remove();
			};
		});
	}, [draw, setup]);

	return (
		<div
			ref={p5CanvasRef}
			style={{ width: "100%", height: "100%" }}
			{...props}
		/>
	);
}
