let mobilenet;
let classifier;
let video;
let label = "test";
let ukeButton;
let whistleButton;
let trainButton;

function modelReady() {
  console.log("Model is ready!!!");
  classifier.load("model.json", customModelReady);
}

const customModelReady = () => {
  console.log("custom Model is ready!!!");
  classifier.classify(gotResults);
};

function videoReady() {
  console.log("Video is ready!!!");
}
let i = 0;
function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    const danger = result.find((item) => item.label === "danger");
    const labelHTML = document.querySelector("H1");
    labelHTML.textContent = "";

    if (danger.confidence > 0.7) {
      label = "Ameaça detectada!!";
      labelHTML.textContent = label;
    }

    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(700, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", () => {
    classifier.load("model.json", customModelReady);
  });

  classifier = mobilenet.classification(video, videoReady);
}

function draw() {
  background(0);
  image(video, 0, 0, 700, 550);
}
