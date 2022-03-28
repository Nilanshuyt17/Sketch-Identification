function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(537, 320);
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
    background("white");
}

function draw() {
    strokeWeight(7);
    stroke("black");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clearCanvas() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("label").innerHTML = "Sketch Name:- " + results[0].label;
        document.getElementById("confidence").innerHTML ="Accuracy:- " + Math.round(results[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}