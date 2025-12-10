// Learned from
// https://p5js.org/tutorials/organizing-code-with-functions/

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

function sky(p: p5) {
	// Draw the sky.
	p.background(redVal, greenVal, 0);
}

function sun(p: p5) {
	// Draw the sun.
	p.fill(255, 135, 5, 60);
	p.circle(300, sunHeight, 180);
	p.fill(255, 100, 0, 100);
	p.circle(300, sunHeight, 140);
}

function mountains(p: p5) {
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
}

function tree(p: p5, x: number, y: number, size: number) {
	p.fill(80, 30, 20);
	p.rect(x - size, y, size * 2, size * 6);
	p.fill(20, 130, 5);
	p.triangle(x - size * 3, y, x, y - size * 8, x + size * 3, y);
}

// A function to calculate the y-coordinate of a tree along a straight line.
function treeLine(x: number) {
	return -0.7 * x + 450;
}

function trees(p: p5) {
	// First tree.
	let x = 150;
	let y = treeLine(x);
	tree(p, x, y, 5);

	// Second tree.
	x = 180;
	y = treeLine(x);
	tree(p, x, y, 5);

	// Third tree.
	x = 210;
	y = treeLine(x);
	tree(p, x, y, 5);
}

function keyPressed() {
	redVal = 0;
	greenVal = 0;
	sunHeight = 600;
}

//variable for initial sun position
let sunHeight = 600; //point below horizon

//variables for color change
let redVal = 0;
let greenVal = 0;

function draw(p: p5) {
	sky(p);
	sun(p);
	mountains(p);
	trees(p);

	if (sunHeight > 140) {
		// reduce sunHeight by 2 until it reaches 140
		sunHeight -= 2;

		// modify custom variables for sky color during sunrise

		if (sunHeight < 480) {
			redVal += 4;
			greenVal += 1;
		}
	}

	p.keyPressed = keyPressed;
}

export function SunriseWithTrees() {
	return <P5Canvas draw={draw} />;
}
