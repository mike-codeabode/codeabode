var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;

function setup() {
  createCanvas(710, 200);
  osc = new p5.SinOsc();

  // Instantiate the envelope with time / value pairs
  envelope = new p5.Env(0.01, 0.5, 1, 0.5);

  osc.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);
    
  if (frameCount % 60 == 0) {
    var midiValue = scaleArray[note];
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc);
    note = (note + 1) % scaleArray.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas 
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length/20; i++) {
    fill(spectrum[i], spectrum[i]/10, 0);
    var x = map(i, 0, spectrum.length/20, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length/20, -h);
  }
  
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], 0, 255, 0, height);
    vertex(x,y);
  }
  endShape();
}