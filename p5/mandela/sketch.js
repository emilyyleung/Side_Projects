let symmetry = 10;
let angle = 360 / symmetry;

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES)
	background(0);
}

function draw() {
	translate(width/2, height/2)

	let mx = mouseX - width/2
	let my = mouseY - height/2
	let pmx = pmouseX - width/2
	let pmy = pmouseY - height/2

	if (mouseIsPressed) {
		strokeWeight(2);
		stroke(255);
		for (let i = 0; i < symmetry; i ++) {
			rotate(angle)
			line(mx, my, pmx, pmy)
			push();
			scale(1, -1);
			line(mx, my, pmx, pmy);
			pop();
		}
	}
}