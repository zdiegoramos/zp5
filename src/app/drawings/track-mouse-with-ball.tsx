"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

function draw(p: p5) {
	p.background("tomato");

	if (p.mouseIsPressed === true) {
		//when mouse button is pressed, circles turn black
		p.fill(0);
	} else {
		p.fill(255);
	}

	//white circles drawn at mouse position
	p.circle(p.mouseX, p.mouseY, 100);
}

export function TrackMouseWithBall() {
	return <P5Canvas draw={draw} />;
}
