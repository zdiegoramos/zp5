"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

const RESOLUTION_MULTIPLIER_16_BY_9 = 32;
const WIDTH = 16 * RESOLUTION_MULTIPLIER_16_BY_9;
const HEIGHT = 9 * RESOLUTION_MULTIPLIER_16_BY_9;

// Resolutions divisible by 8
// 24 multiplier gives 384x216 resolution
// 32 multiplier gives 512x288 resolution

function sketch({ params }: { params: { a: number } }) {
	return (p: p5) => {
		p.setup = () => {
			// VERTICAL CANVAS
			p.createCanvas(HEIGHT, WIDTH);
		};

		p.draw = () => {
			p.background(220);
			//sun in top right
			p.fill("yellow"); //yellow

			p.stroke("orange"); //orange outline

			p.strokeWeight(3); //large outline
			p.circle(30, 50, params.a * 50);
			//grass on bottom half

			p.stroke(0); //black outline

			p.strokeWeight(1); //outline thickness

			p.fill("green");

			p.rect(0, 256, 288, 256);

			//emojis
			p.textSize(75);
			p.text("🌸", 100, 250); //flower
			p.text("🐞", 150, 250); //ladybug

			// if (p.mouseIsPressed === true) {
			// 	//when mouse button is pressed, circles turn black
			// 	p.fill(0);
			// } else {
			// 	p.fill(255);
			// }

			// //white circles drawn at mouse position
			// p.circle(p.mouseX, p.mouseY, 100);
		};
	};
}

export function P5() {
	const p5CanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const p5Current = p5CanvasRef.current;

		if (!p5Current) {
			return;
		}

		// Dynamically import p5 only on the client side
		import("p5").then((p5Module) => {
			const p5Instance = new p5Module.default(
				sketch({ params: { a: 1 } }),
				p5Current,
			);

			return () => {
				p5Instance.remove();
			};
		});
	}, []);

	return <div ref={p5CanvasRef} />;
}
