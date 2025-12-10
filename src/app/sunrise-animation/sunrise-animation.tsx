// Learned from
// https://p5js.org/tutorials/organizing-code-with-functions/

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

//variable for initial sun position
let sunHeight = 600; //point below horizon

//variables for color change
let redVal = 0;
let greenVal = 0;

function draw(p: p5) {
	//fill background with color based on custom variables
	p.background(redVal, greenVal, 0);

	//sun
	p.fill(255, 135, 5, 60);
	p.circle(300, sunHeight, 180);
	p.fill(255, 100, 0, 100);
	p.circle(300, sunHeight, 140);

	//mountains
	p.fill(110, 50, 18);
	p.triangle(200, 400, 520, 253, 800, 400);
	p.fill(110, 95, 20);
	p.triangle(200, 400, 520, 253, 350, 400);

	p.fill(150, 75, 0);
	p.triangle(-100, 400, 150, 200, 400, 400);
	p.fill(100, 50, 12);
	p.triangle(-100, 400, 150, 200, 0, 400);

	p.fill(150, 100, 0);
	p.triangle(200, 400, 450, 250, 800, 400);
	p.fill(120, 80, 50);
	p.triangle(200, 400, 450, 250, 300, 400);

	if (sunHeight > 130) {
		// reduce sunHeight by 2 until it reaches 130
		sunHeight -= 2;
	}

	if (sunHeight < 480) {
		// increase color variables by 4 or 1 during sunrise
		redVal += 4;
		greenVal += 1;
	}
}

export function SunriseAnimation() {
	return <P5Canvas draw={draw} />;
}
