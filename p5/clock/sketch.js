let canvasSize = 400;
let clockRadius = 100;
let clockDiameter = clockRadius*2

let hr, mn, sc;

function setup() {
	createCanvas(canvasSize, canvasSize);
	angleMode(DEGREES)
}

function draw() {
	background("#dee3e2");
	
	hr = nf(hour(), 2);
	mn = nf(minute(), 2);
	sc = nf(second(), 2);

	noStroke();
	textSize(20);
	fill("#116979");
	textAlign(CENTER, CENTER);
	textFont("Cutive Mono")
	text(hr + ":" + mn + ":" + sc, width/2, height/2);

	translate(width/2, height/2);
	rotate(-90)

	hourHand = map(hr % 12, 0, 12, 0, 360)
	minHand = map(mn, 0, 60, 0, 360)
	secHand = map(sc, 0, 60, 0, 360)

	strokeWeight(10);
	noFill();

	stroke("#116979");
	arc(0, 0, clockDiameter-60, clockDiameter-60, 0, hourHand)

	stroke("#18b0b0");
	arc(0, 0, clockDiameter-30, clockDiameter-30, 0, minHand)
	
	stroke("#de7119");
	arc(0, 0, clockDiameter, clockDiameter, 0, secHand)

	strokeWeight(5);
	stroke(255);
	for (let fiver = 0; fiver <= 12; fiver ++) {
		let x = (clockRadius-30) * sin(fiver*30);
		let y = (clockRadius-30) * cos(fiver*30);
		point(x, y);
	}
}