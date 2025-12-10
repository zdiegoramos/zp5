"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

let colums = 0;
let rows = 0;
let blocks: ReturnType<typeof Block>[][] = [];
const mouseDistance = 30;

// let b: ReturnType<typeof Block>;

function Block(x: number, y: number, size: number) {
	return {
		x,
		y,
		angle: 0,
		display(p: p5) {
			p.push();
			p.translate(this.x, this.y);
			p.rotate(this.angle);
			p.rect(0, 0, size, size);
			p.pop();
		},
		move(p: p5) {
			const distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);
			if (p.pmouseX - p.mouseX !== 0 || p.pmouseY - p.mouseY !== 0) {
				if (distance < mouseDistance) {
					this.angle += 1;
				}
			}
			if (this.angle > 0 && this.angle <= 90) {
				this.angle += 1;
			} else {
				this.angle = 0;
			}
		},
	};
}

function setup(p: p5) {
	p.angleMode(p.DEGREES);
	p.rectMode(p.CENTER);
	// Divide canvas into grid of blocks
	// Calculate the number of rows and columns based on
	// the width and height of the canvas
	// Each block should be 5% of the canvas size
	const size = p.width * 0.05;
	colums = p.width / size;
	rows = p.height / size;

	// b = Block(p.width / 2, p.height / 2);

	blocks = Array.from({ length: colums }, (_, i) =>
		Array.from({ length: rows }, (_, j) =>
			Block(i * size + size / 2, j * size + size / 2, size),
		),
	);

	console.log(blocks);
}

function draw(p: p5) {
	p.background("tomato");

	for (let i = 0; i < colums; i++) {
		for (let j = 0; j < rows; j++) {
			blocks[i]?.[j]?.move(p);
			blocks[i]?.[j]?.display(p);
		}
	}
}

export function Tiles() {
	return <P5Canvas draw={draw} setup={setup} />;
}
