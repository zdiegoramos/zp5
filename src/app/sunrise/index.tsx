// Learned from
// https://p5js.org/tutorials/conditionals-and-interactivity/

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

//custom variables for y-coordinate of sun & horizon
let sunHeight = 0;

function draw(p: p5) {
	const horizon = p.height / 2;

	p.background(0);
	//sun follows y-coordinate of mouse
	sunHeight = p.mouseY;

	if (sunHeight < horizon) {
		//light blue background if sun is above horizon
		p.background("lightblue");
	}

	//sun
	p.fill("yellow");
	p.circle(p.width / 2, sunHeight, 160);

	//grass
	p.fill("green");
	p.rect(0, horizon, p.width, horizon);
}

export function Sunrise() {
	return <P5Canvas draw={draw} />;
}
