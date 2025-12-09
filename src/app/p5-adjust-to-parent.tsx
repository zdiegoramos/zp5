"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

function sketch(parentElement: HTMLDivElement) {
	return (p: p5) => {
		p.setup = () => {
			const width = parentElement.clientWidth;
			const height = parentElement.clientHeight;
			p.createCanvas(width, height);
			// p.background(0);
			// p.circle(200, 200, 400);
		};

		p.windowResized = () => {
			const width = parentElement.clientWidth;
			const height = parentElement.clientHeight;
			p.resizeCanvas(width, height);
		};

		p.draw = () => {
			p.background(135, 206, 235);
			//sun in top right
			p.fill("yellow"); //yellow

			p.stroke("orange"); //orange outline

			p.strokeWeight(3); //large outline
			p.circle(30, 50, 1 * 50);
			//grass on bottom half

			p.stroke(0); //black outline

			p.strokeWeight(1); //outline thickness

			p.fill("green");

			p.rect(0, p.height / 2, p.width, p.height / 2);

			//emojis
			p.textSize(75);
			p.text("🌸", 100, 250); //flower
			p.text("🐞", p.mouseX, p.mouseY); //ladybug
			p.text("HELLO", 200, 100);

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

export function P5Test() {
	const p5CanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const p5Current = p5CanvasRef.current;

		if (!p5Current) {
			return;
		}

		// Dynamically import p5 only on the client side
		import("p5").then((p5Module) => {
			const p5Instance = new p5Module.default(sketch(p5Current), p5Current);

			return () => {
				p5Instance.remove();
			};
		});
	}, []);

	return <div ref={p5CanvasRef} style={{ width: "100%", height: "100%" }} />;
}
