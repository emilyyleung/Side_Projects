let canvasSize = 400;
let clockRadius = 100;
let clockDiameter = clockRadius*2

let rounds;
// let rounds = 1;
let startSecond = 5;
let exercises = ["Marching High Knees", "10 Punches Shuffle", "Floor Touch Squats", "High Knee Shoulder Press", "Power Knees"]
let encouragements = ["YOU GOT THIS!", "NO PAIN, NO GAIN!", "KEEP IT UP!", "GREAT JOB!", "HANG IN THERE!", "COME ON, YOU CAN DO IT!", "DON'T GIVE UP", "IT'S NOT MEANT TO BE EASY!", "KEEP GOING!", "DON'T QUIT NOW!"]
let customEncouragements = [];

// let endTime = rounds * exercises.length
let endTime;

let countText;
let timeLeft;
let millisecond;
let counter = 0;
let round = 0;

let finishColours = ["#FCBF1E","#F7A231", "#F18444", "#E64969", "#E663A2", "#6C2CF5", "#4C159E","#120136", "#035AA6", "#40BAD5", "#FCBF1E", "#F7A231", "#F18444","#40BAD5", "#035AA6",  "#120136"]

let mn, sc;

let run = false;

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

	let params = getURLParams();
	console.log(params)
	
	if (typeof(params.rounds) == typeof("hello")) {
		rounds = params.rounds
	} else {
		rounds = 4;
	}

	endTime = rounds * exercises.length

	timeLeft = minutesToSeconds(endTime)

	for (let e = 0; e < endTime; e ++) {
		customEncouragements.push(random(encouragements))
	}
}

function draw() {
	background("#dee3e2");
	
	millisecond = millis();

	if (floor(millisecond/1000) > startSecond) {

		mn = nf(minute(),2);
		sc = nf(second(),2);

		let result = timeLeft - floor(millisecond/1000) + startSecond

		let startDiameter = clockDiameter - 90;
		// WHEN THE TIMER FINISHES - I.E. REACHES 00m 00s
		if (result == 0) {

	// 		for (let j = 0; j < finishColours.length; j ++) {
	// 			stroke(finishColours[j]);
	// 			arc(width/2, height/2, startDiameter + (j * 30), startDiameter + (j * 30), 0, 360)
	// 		}

		let fromCol = color("#de7119")
		let toCol = color("#18b0b0")

		let ringCount = 25

		for (let j = 0; j < ringCount; j ++) {
			let col = lerpColor(fromCol, toCol, j/ringCount)
			stroke(col);
			strokeWeight(1);
			noFill();
			ellipse(width/2, height/2, startDiameter + (j*20))
		}

			noStroke();
			textSize(20);
			fill("#116979");
			textAlign(CENTER, CENTER);
			textFont("Cutive Mono")
			textStyle(BOLD)
			text("NICE\nWORK", width/2, height/2);

			// STOP THE SKETCH
			noLoop();
		} else {
			let currentMin = nf(secondsToMinsSecs(result)["minutes"],2)
			let currentSec = nf(secondsToMinsSecs(result)["seconds"],2)

			// DIVIDEND / DIVISOR = QUOTIENT + REMAINDER

			// USING DIVISION TO GET THE QUOTIENT AS THE ROUND
			let currentRound = floor((endTime - currentMin - 1) / exercises.length) + 1

			// USING MODULO TO GET THE REMAINDER AS THE INDEX
			let exercise = exercises[(endTime - currentMin - 1) % exercises.length]
			let nextExercise = exercises[(endTime - currentMin) % exercises.length]

			if (endTime - currentMin > (endTime - 1)) {
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
				text(customEncouragements[(endTime - currentMin)] , width/2, 7*height/8);
			} else {
				fill("#de7119");
				text(customEncouragements[(endTime - currentMin - 1)] , width/2, 7*height/8);
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

			rotate(-90)

			for (let r = 0; r < currentRound; r ++) {
				let angle = (r / rounds) * 360
				let x = (clockRadius - 15) * sin(-angle)
				let y = (clockRadius - 15) * cos(-angle)
				strokeWeight(10);
				stroke(255);
				point(x, y)
			}

		}
	} else {
		noStroke();
		textSize(20);
		fill("#116979");
		textAlign(CENTER, CENTER);
		textFont("Cutive Mono")

		let countdown = startSecond - floor(millisecond/1000)
		if (countdown == 0) {
			countText = "LET'S DO THIS!"
		} else {
			countText = countdown
		}

		text(countText, width/2, height/2);

	}
}