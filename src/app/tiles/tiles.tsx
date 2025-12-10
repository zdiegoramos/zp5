// Learned from Patt Vira
// https://www.youtube.com/watch?v=Fbzqfsy5GnM

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

let colums = 0;
let rows = 0;
let blocks: ReturnType<typeof Block>[][] = [];
const MOUSE_DISTANCE_TRIGGER = 50;
const BLOCK_SIZE_AS_PERCENTAGE_OF_CANVAS = 0.01;

function Block(i: number, j: number, size: number) {
	// The position of the block is calculated based on its grid indices
	// and the size of each block to center it within its grid cell
	// Example: for i=0, j=0 and size=50, x=25, y=25
	// for i=1, j=0 and size=50, x=75, y=25, etc.
	const x = i * size + size / 2;
	const y = j * size + size / 2;
	const OFFSET = size * 0.4;

	return {
		color: 70,
		angle: 0,
		display(p: p5) {
			p.noFill();
			p.stroke(this.color);
			p.push();
			p.translate(x, y);
			this.move(p);
			p.rotate(this.angle);
			p.rect(0, 0, size - OFFSET, size - OFFSET);
			p.pop();
		},
		move(p: p5) {
			// Calculate distance from mouse to block center
			const distanceFromBlockMouse = p.dist(p.mouseX, p.mouseY, x, y);
			const mouseMoved =
				p.pmouseX - p.mouseX !== 0 || p.pmouseY - p.mouseY !== 0;

			// Start animation if mouse is close to block
			if (mouseMoved && distanceFromBlockMouse < MOUSE_DISTANCE_TRIGGER) {
				this.angle += 1;
				this.color = 255;
			}

			// Continue rotating block until angle reaches 50
			if (this.angle > 0 && this.angle <= 50) {
				this.angle += 1;
			}
			// Reset angle when it reaches 50 degrees
			if (this.angle > 50) {
				this.angle = 0;
			}

			// Fade color back to original
			if (this.color > 70) {
				this.color -= 3;
			}
		},
	};
}

function setup(p: p5) {
	p.angleMode(p.DEGREES);
	p.rectMode(p.CENTER);
	// Select the bigger dimension between width and height
	// To size the blocks proportionally to that side
	// This makes the block size consistent across different canvas aspect ratios
	const size = Math.max(p.width, p.height) * BLOCK_SIZE_AS_PERCENTAGE_OF_CANVAS;
	// Round up to fill the canvas
	colums = Math.ceil(p.width / size);
	rows = Math.ceil(p.height / size);

	blocks = Array.from({ length: colums }, (_, i) =>
		Array.from({ length: rows }, (_, j) => Block(i, j, size)),
	);
}

function draw(p: p5) {
	p.background(0);

	blocks.flat().forEach((block) => {
		block.display(p);
	});
}

export function Tiles() {
	return <P5Canvas draw={draw} setup={setup} />;
}
