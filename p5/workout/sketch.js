let canvasSize = 400;
let clockRadius = 100;
let clockDiameter = clockRadius*2

let endTime = 20;
let timeLeft;
let millisecond;
let counter = 0;
let round = 0;

let finishColours = ["#120136", "#035AA6", "#40BAD5", "#FCBF1E","#F7A231", "#F18444", "#E64969", "#E663A2", "#6C2CF5", "#4C159E","#120136", "#035AA6", "#40BAD5", "#FCBF1E", "#F7A231", "#F18444"]

let allExercises;
let exercises = ["Marching High Knees", "10 Punches Shuffle", "Floor Touch Squats", "High Knee Shoulder Press", "Power Knees"]

if (endTime > exercises.length) {
	let multiplier = endTime / exercises.length
	allExercises = []
	for (let x = 0; x < multiplier; x ++){
		for (let y = 0; y < exercises.length; y ++) {
			allExercises.push(exercises[y])
		}
	}
} else {
	allExercises = exercises
}

let mn, sc;

function minutesToSeconds(minutes) {
	return minutes * 60
}

function secondsToMinsSecs(seconds) {
	let mins = floor(seconds / 60);
	let secs = seconds % 60;
	return {"minutes": mins, "seconds": secs}
}

function setup() {
	createCanvas(canvasSize, canvasSize);
	angleMode(DEGREES)
	timeLeft = minutesToSeconds(endTime)
}

function draw() {

	background("#dee3e2");

	mn = nf(minute(),2);
	sc = nf(second(),2);

	millisecond = millis();

	let result = timeLeft - floor(millisecond/1000)
	if (result == 0) {
		background("#dee3e2");

		let startDiameter = clockDiameter - 90;

		for (let j = 0; j < finishColours.length; j ++) {
			stroke(finishColours[j]);
			arc(width/2, height/2, startDiameter + (j * 30), startDiameter + (j * 30), 0, 360)
		}

		noStroke();
		textSize(20);
		fill("#116979");
		textAlign(CENTER, CENTER);
		textFont("Cutive Mono")

		text("NICE\nWORK", width/2, height/2);

		noLoop();
	} else {
		let currentMin = nf(secondsToMinsSecs(result)["minutes"],2)
		let currentSec = nf(secondsToMinsSecs(result)["seconds"],2)

		let exercise = allExercises[endTime - currentMin - 1]
		let nextExercise = allExercises[endTime - currentMin]

		if (nextExercise == undefined) {
			nextExercise = "NOTHING, WOO HOO!"
		}

		noStroke();
		textSize(20);
		fill("#116979");
		textAlign(CENTER, CENTER);
		textFont("Cutive Mono")

		text(currentMin + "m " + currentSec + "s" , width/2, height/2);

		if (currentSec > 0 && currentSec <= 30) {
			fill("#18b0b0");
			text("REST" , width/2, 7*height/8);
			text("COMING UP: \n" + nextExercise , width/2, 1*height/8);
		} else if (currentSec == 0) {
			fill("#de7119");
			text("LET'S GO!\n" + nextExercise, width/2, 1*height/8);
		} else {
			fill("#de7119");
			text("LET'S GO!\n" + exercise , width/2, 1*height/8);
		}

		translate(width/2, height/2);
		rotate(-90)

		secHand = map(currentSec, 0, 60, 0, 360)

		strokeWeight(10);
		noFill();

		if (currentSec > 0 && currentSec <= 30) {
			stroke("#18b0b0");
			arc(0, 0, clockDiameter-30, clockDiameter-30, 0, secHand)
		} else {
			stroke("#de7119");
			arc(0, 0, clockDiameter-30, clockDiameter-30, 180, secHand)
		}

	}
}