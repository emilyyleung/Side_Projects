paper.install(window);
var paintColour = "white"
var strokeWidth = 20
var defaultLayer = "defaultLayer"

const changeColour = (colour) => {
	paintColour = colour
}

const increaseSize = () => {
	strokeWidth += 2;
	updateStrokeWidth();
}

const decreaseSize = () => {
	if(strokeWidth != 2) {
		strokeWidth -= 2;
		updateStrokeWidth();
	}
}

const updateStrokeWidth = () => {
	$("#strokeWidth").html(strokeWidth)
}

var FizzyText = function() {
	this.Project_Title = 'hello world';
	this.colour = "#ffae23";
	this.Stroke_Width = 20;
};

$(document).ready(function() {


	var gui = new dat.GUI();

	var text = new FizzyText();
	var options = {
		Choose_Colour: "#ffffff", // CSS string
	};

	gui.add(text, "Project_Title")

	var widthPick = gui.add(text, "Stroke_Width", 2, 200)
	widthPick.onFinishChange(function(val){
		strokeWidth = val
	})

	var colourPick = gui.addColor(options, 'Choose_Colour')
	colourPick.onChange(function(val){
		paintColour = val
	})

	//////////////////////////////////////////////

	updateStrokeWidth();
	
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
		if(ev.isFirst) {
			if(ev.srcEvent.shiftKey) {
				startDraw(ev, "black", strokeWidth, "destination-out");
			} else {
				startDraw(ev, paintColour, strokeWidth);
			}
		} else if (ev.isFinal) {
			endDraw(ev);
		} else {
			middleDraw(ev);
		}
	})

	

	const clearScreen = () => {
		paper.project.activeLayer.removeChildren();
	}

	const startPoint = (ev, strokeWidth = strokeWidth, colour = paintColour) => {

		var start = new paper.Shape.Circle({
			center: {x: ev.center.x, y: ev.center.y},
			radius: strokeWidth/2,
			fillColor: paintColour,
		})
	}

	const startDraw = (ev, strokeColor = paintColour, strokeWidth = 3, blendMode = "normal") => {
		var path = new paper.Path({
			strokeColor: strokeColor,
			strokeWidth: strokeWidth,
			strokeCap: "round",
			strokeJoin: "round",
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
		paper.project.activeLayer.lastChild.simplify(20)
	}

})