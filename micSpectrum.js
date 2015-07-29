var mic, fft;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // Create an FFT object
  fft = new p5.FFT();

  // Get the mic and hook it into the FFT object
  mic = new p5.AudioIn();
  mic.start();
  mic.connect(fft);
}

// Resize the canvas to match the window size
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  // Fill the background with a dark color
  background(20);

  // Draw some gridlines on the background
  stroke(75);
  strokeWeight(0.5);
  var boxWidth = 50;
  var dim = max(width, height);
  var lines = ceil(dim/boxWidth);
  for (var i = 0; i <= lines; i++) {
    if (i % 4 == 0) {
      strokeWeight(2);
    }
    else {
      strokeWeight(0.5);
    }
    var d = i*boxWidth;
    line(0, d, width, d);
    line(d, 0, d, height);
  }

  // Get the waveform from the FFT
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(0,255,0); // waveform is red
  strokeWeight(5);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], 0, 255, 0, height) + 5;
    vertex(x,y);
  }
  endShape();

}