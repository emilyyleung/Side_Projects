// GLOBAL VARIABLES

let canvasSize = 400;
let chosen;
let thickness = 1;

// COLOUR PICKER
var colourPicker = function( cp ) { // p could be any variable name
	var hueSlider;
	var cpVal;
	var img;
	var canvasDivision = 20;
	var colours = [];

	cp.setup = function() {
		cp.createCanvas(canvasSize, canvasSize + 50);
		cp.colorMode(cp.HSB);

		chosen = cp.color(0);

		hueSlider = cp.createSlider(0, 360, 0);
		hueSlider.position(10, 415);
		hueSlider.style('width', '380px');

		cp.background(0);
	};

	cp.draw = function() {
		cp.colorMode(cp.HSB);

		cpVal = hueSlider.value();
		cp.background(50);

		img = cp.createImage(canvasDivision, canvasDivision);
		img.loadPixels();

		for (var y = 0; y < img.height; y ++) {
			let row = []
			for (var x = 0; x < img.width; x ++) {
				var c = cp.color(cpVal, ((x)/img.width) * 100, ((img.height - y)/img.height) * 100)
				img.set(x, y, c)
			}
			colours.push(row)
		}

		img.updatePixels();

		// cp.noSmooth();
		cp.image(img, 0, 0, canvasSize, canvasSize);

		cp.colorMode(cp.RGB);
		if (chosen == "") {
			cp.fill(255);
		} else {
			cp.fill(chosen);
		}
		cp.stroke(255);
		cp.strokeWeight(2);
		cp.ellipse(cp.mouseX, cp.mouseY, 30);

		cp.noStroke();
		cp.textSize(20);
		cp.fill(255);
		cp.textAlign(cp.CENTER, cp.CENTER);
		cp.textFont("Cutive Mono");
		cp.textStyle(cp.BOLD);

		let r = cp.red(chosen);
		let g = cp.green(chosen);
		let b = cp.blue(chosen);

		cp.text("r: " + r +"\ng: " + g + "\nb: " + b, cp.width/2, 400);
	};

	cp.mousePressed = function() {
		console.log(chosen)
		// cp.colorMode(cp.HSB)
		if (cp.mouseX >= 0 && cp.mouseX <= cp.width && cp.mouseY >= 0 && cp.mouseY <= cp.height - 50) {
			let mx = cp.map(cp.mouseX, 0, canvasSize, 0, canvasDivision)
			let my = cp.map(cp.mouseY, 0, canvasSize, 0, canvasDivision)
			chosen = img.get(mx, my);
		}
	}
};
var myp5 = new p5(colourPicker, 'c1');

// DRAWING SPACE
var drawingSpace = function( ds ) { 

	var strokeSlider;
 
	ds.setup = function() {
		ds.createCanvas(canvasSize, canvasSize + 50);
		ds.background(0);
		chosen = ds.color(255);

		strokeSlider = ds.createSlider(1, 100, 4);
		strokeSlider.position(10, canvasSize*2 + 65 + 4);
		strokeSlider.style('width', '380px');

		console.log(ds.width, ds.height);
	};

	ds.draw = function() {
		if (ds.mouseX >= 0 && ds.mouseX <= ds.width && ds.mouseY >= 0 && ds.mouseY <= ds.height - 50) {
			if (ds.mouseIsPressed) {

				// console.log(ds.mouseX, ds.mouseY)

				ds.noFill();

				ds.stroke(chosen)
				ds.strokeWeight(strokeSlider.value());
				ds.line(ds.mouseX, ds.mouseY, ds.pmouseX, ds.pmouseY)

			}
		}

		ds.noStroke();
		ds.fill(50);
		ds.rect(0, 400, 400, 50)
		// ds.noLoop();
	};
};
var myp5 = new p5(drawingSpace, 'c2');