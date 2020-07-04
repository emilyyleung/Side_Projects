paper.install(window);

var defaultStrokeCap = "round"
var defaultStrokeJoin = "round"

// pen defaults
var paintColour = "white"
var strokeWidth = 20
var defaultLayer = "defaultLayer"

// erase defaults
var eraseColor = "black"
var eraseWeight = strokeWidth
var bigEraseMultiplier = 15
var eraseBlendMode = "destination-out"

var simulated = false;
var lastAction;

const changeColour = (colour) => {
	paintColour = colour
}

// const increaseSize = () => {
// 	strokeWidth += 2;
// 	updateStrokeWidth();
// }

// const decreaseSize = () => {
// 	if(strokeWidth != 2) {
// 		strokeWidth -= 2;
// 		updateStrokeWidth();
// 	}
// }

// const updateStrokeWidth = () => {
// 	$("#strokeWidth").html(strokeWidth)
// }
const test = () => {
	alert("hey world")
}

$(document).ready(function() {

	var FizzyText = function() {
		this.Project_Title = 'hello world';
		this.colour = "#ffae23";
		this.Stroke_Width = 20;
		this.Clear_Screen = function() {
			clearScreen()
		}
	};

	var gui = new dat.GUI();

	var text = new FizzyText();
	var options = {
		Choose_Colour: "#ffffff", // CSS string
	};

	gui.add(text, "Project_Title")

	var widthPick = gui.add(text, "Stroke_Width", 2, 200)
	widthPick.onFinishChange(function(val){
		strokeWidth = val
		eraseWeight = val
	})

	var colourPick = gui.addColor(options, 'Choose_Colour')
	colourPick.onChange(function(val){
		paintColour = val
	})

	gui.add(text, "Clear_Screen")

	//////////////////////////////////////////////

	// updateStrokeWidth();
	
	// var mc = new Hammer(document.getElementById("myCanvas"))

	var mc = new Hammer.Manager(document.getElementById("myCanvas"))
	mc.add(new Hammer.Tap({
		event: "singletap",
	}));


	mc.add(new Hammer.Tap({
		event: "doubletap",
		taps: 3
	}));

	mc.get('doubletap').recognizeWith('singletap');
	mc.on("singletap", function(ev){
		startPoint(ev, strokeWidth)
	});

	mc.on("doubletap", function(ev){
		console.log("hello")
		clearScreen()
	});

	paper.setup(document.getElementById("myCanvas"))

	let layer = new paper.Layer();
	layer.name = "layer1"

	layer = new paper.Layer()
	layer.name = "layer2"

	paper.project.layers["layer1"].activate();

	console.log(paper.project.layers)

	mc.on("hammer.input", function(ev) {
		console.log(ev)

		// let the shift key simulate 2 fingers
		// cmd (windows) key simulate 3 fingers
		// cmd (windows) + shift key simulate 5 fingers

		if(ev.srcEvent.shiftKey && ev.srcEvent.metaKey) {
			ev.maxPointers = 5
			simulated = true
		} else if (ev.srcEvent.shiftKey) {
			ev.maxPointers = 2
			simulated = true
		} else if(ev.srcEvent.metaKey) {
			ev.maxPointers = 3
			simulated = true
		} else {
			simulated = false
		}

		// start processing events / actions

		if(ev.isFirst) {
			startFirstAction(ev)
		} else if(ev.isFinal) {
			finishCurrentAction(ev);
		} else {
			handleMiddleEvent(ev)
		}

		// Old code

		// if(ev.isFirst) {
		// 	if(ev.srcEvent.shiftKey) {
		// 		startDraw(ev, "black", strokeWidth, "destination-out");
		// 	} else {
		// 		startDraw(ev, paintColour, strokeWidth);
		// 	}
		// } else if (ev.isFinal) {
		// 	endDraw(ev);
		// } else {
		// 	middleDraw(ev);
		// }
	})

	function startFirstAction(ev) {
		lastNumPointers = ev.maxPointers

		switch (ev.maxPointers) {
			case 1:
				startDraw(ev, paintColour, strokeWidth)
			break;

			case 2:
				startErase(ev, false, strokeWidth)
			break;

			case 3:
				startErase(ev, true, strokeWidth)
			break;

			case 5:
				console.log("start pan")
			break;
		}
	}

	function handleMiddleEvent(ev) {
		// if we have a new action, end the current operation and start a new one

		if(lastNumPointers != ev.maxPointers) {
			finishCurrentAction(ev);
			startFirstAction(ev);
		}

		switch(lastAction) {
			case "draw":
				middleDraw(ev)
			break;

			case "bigErase":
			case "erase":
				middleErase(ev);
			break;

			case "pan":
				console.log("middle pan")
			break;
		}
	}

	function finishCurrentAction(ev) {
		switch (lastAction) {
			case "draw":
				endDraw(ev)
			break;

			case "erase":
			case "bigErase":
				endErase(ev);
			break;

			case "pan":
				console.log("end pan")
			break;
		}
	}

	/*
	 *	 ACTIONS RELATED TO DRAWING 
	 */

	const startPoint = (ev, strokeWidth = strokeWidth, colour = paintColour) => {

		var start = new paper.Shape.Circle({
			center: {x: ev.center.x, y: ev.center.y},
			radius: strokeWidth/2,
			fillColor: paintColour,
		})
	}

	const startDraw = (ev, strokeColor = paintColour, strokeWidth = 20, blendMode = "normal") => {

		lastAction = "draw"

		var path = new paper.Path({
			strokeColor: strokeColor,
			strokeWidth: strokeWidth,
			strokeCap: defaultStrokeCap,
			strokeJoin: defaultStrokeJoin,
			blendMode: blendMode
		});
	}

	const middleDraw = (ev) => {
		// console.log("middleDraw", {x: ev.center.x, y: ev.center.y});
		// paper.project._activeLayer.lastChild.add({x: ev.center.x, y: ev.center.y})

		paper.project.activeLayer.lastChild.add({x: ev.center.x, y: ev.center.y})
	}

	const endDraw = (ev) => {
		// console.log("endDraw", {x: ev.center.x, y: ev.center.y});
		paper.project.activeLayer.lastChild.simplify(8)
	}

	/*
	 *	 ACTIONS RELATED TO ERASING 
	 */

	const clearScreen = () => {
		paper.project.activeLayer.removeChildren();
	}

	const startErase = (ev, bigErase = false) => {

		if(!bigErase) {

			lastAction = "erase"
			
			path = new paper.Path({
				strokeColor: eraseColor,
				strokeWidth: eraseWeight,
				strokeCap: defaultStrokeCap,
				strokeJoin: defaultStrokeJoin,
				blendMode: eraseBlendMode
			})
		} else {

			lastAction = "bigErase"

			path = new paper.Path({
				strokeColor: eraseColor,
				strokeWidth: eraseWeight * bigEraseMultiplier,
				strokeCap: defaultStrokeCap,
				strokeJoin: defaultStrokeJoin,
				blendMode: eraseBlendMode
			})
		}
	}

	const middleErase = (ev, bigErase = false) => {
		paper.project.activeLayer.lastChild.add({x: ev.center.x, y: ev.center.y})
	}

	const endErase = (ev, bigErase = false) => {
		paper.project.activeLayer.lastChild.simplify(8)
	}

})