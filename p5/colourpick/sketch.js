let canvasSize = 400;

let fromCol, toCol;

let chosen;
let newCol;
let img;
let slider;

let colours;
let canvasDivision = 10

function setup() {
	colorMode(HSB);
    createCanvas(canvasSize, canvasSize);
    chosen = color(0);

	slider = createSlider(0, 360, 0);
	slider.position(10, 10);
	slider.style('width', '380px');

}

function draw() {
	colorMode(HSB)
    background(0);

    let val = slider.value();

    img = createImage(canvasDivision, canvasDivision);
    img.loadPixels();

    colours = []
    
    for (var y = 0; y < img.height; y++) {
    	let row = []
        for (var x = 0; x < img.width; x++) {

        	var c = color(val, ((x)/img.width) * 100, ((img.height - y)/img.height) * 100)

            // var c = color((y/canvasDivision)*255, (x/canvasDivision) * 255, 0); // ORIGINAL
            // var c = color(((canvasDivision - y)/canvasDivision)*255, ((canvasDivision -x)/canvasDivision) * 255, ((canvasDivision - x)/canvasDivision)*255); // ALMOST THERE
            // row.push(c.toString())
            img.set(x, y, c);
        }
        colours.push(row)
    }

    img.updatePixels();

    // noSmooth();
    image(img, 0, 0, canvasSize, canvasSize);

  	colorMode(RGB)
  	if (chosen == "") {
  		fill(255)
  	} else {
  		fill(chosen)
  	}

    ellipse(mouseX, mouseY, 30)
}

function mousePressed() {
	let mx = map(mouseX, 0, canvasSize, 0, canvasDivision)
	let my = map(mouseY, 0, canvasSize, 0, canvasDivision)
	chosen = img.get(mx, my);
}