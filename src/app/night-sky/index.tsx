// Learned from
// https://p5js.org/tutorials/variables-and-change/

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

//custom variable for x coordinate of cloud
let cloudOneX = 50;
//custom variable for shooting stars
let lineXone = 0;
let lineYone = 0;

function draw(p: p5) {
	p.background("navy"); //navy background
	p.frameRate(15); //set frame rate to 15

	//moon
	p.fill(255);
	p.stroke(0);
	p.circle(350, 50, 100);

	//overlapping navy circle for crescent moon
	p.stroke("navy");
	p.fill("navy");
	p.circle(320, 50, 100);

	//big gray mountains
	p.stroke(0);
	p.fill(80);
	p.triangle(-40, 300, 75, 100, 250, 300);
	p.triangle(100, 300, 300, 100, 500, 300);

	//grass
	p.fill("rgb(50,76,50)");
	p.rect(0, 300, 400, 100);

	//growing tree
	//trunk
	p.fill("rgb(118,80,72)");
	p.rect(40, 270, 15, 50);
	//leaves
	p.fill("green");
	p.triangle(25, 270, 45, 240 - (p.frameCount % 290), 70, 270);

	//trunk
	p.fill("rgb(118,80,72)");
	p.rect(340, 330, 15, 50);
	//leaves
	p.fill("green");
	p.triangle(325, 330, 345, 240 - (p.frameCount % 290), 370, 330);
	//cloud
	p.fill(255);
	p.ellipse(cloudOneX, 50, 80, 40);
	p.ellipse(cloudOneX - 40, 100, 60, 20);
	p.ellipse(cloudOneX + 20, 150, 40, 10);

	//shooting star
	p.stroke("yellow");
	p.line(lineXone, lineYone, lineXone + 30, lineYone - 30);

	//set shooting star to random location
	lineXone = p.random(0, p.width);
	lineYone = p.random(0, p.height / 2);

	//sets the x coordinate to the frame count
	//resets at left edge
	cloudOneX = p.frameCount % p.width;

	//displays the x and y position of the mouse on the canvas
	// p.fill(255); //white text
	// p.text(`mouseX: ${p.mouseX}, mouseY: ${p.mouseY}`, 20, 20);
}

export function NightSky() {
	return <P5Canvas draw={draw} />;
}
