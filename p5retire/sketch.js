//Zachary Witt
//based on Networthify's http://networthify.com early retirement calculator
//main formula uses differing (read "proper") compounding interest formula than Networthify

var M;
var R;
var W;
var P;
var r;
var t;

var years;

function setup() {
  frameRate(5);
  M = 50000.00;
  R = 60.0;
  W = 4.0;
  P = 0.0;
  r = 5.0;
  t = 0;


  var cv = createCanvas(windowWidth, windowHeight);

  for (var n = 0; n < 100; n += 0.01) {
    if (M - (M * (R / 100)) <= Math.floor((W / 100) * ((P * pow((1 + (r / 100) / 12), (n * 12))) + ((M * (R / 100)) / 12 * (pow((1 + (r / 100) / 12), (n * 12)) - 1) / ((r / 100) / 12))))) {
      t = n;
      break;
    }
  }
  var inpM = createInput(M);
  inpM.input(inpMEvent);
  var inpR = createInput(R);
  inpR.input(inpREvent);
  var inpW = createInput(W);
  inpW.input(inpWEvent);
  var inpP = createInput(P+"");
  inpP.input(inpPEvent);
  var inpr = createInput(r);
  inpr.input(inprEvent);

  var inputs = selectAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].size(80, 15);
    inputs[i].position(width / 2 - 40, height / 2 + 10 + (inputs[i].height + 2) * i);
  }
}

function inpMEvent() {
  M = this.value();
}

function inpREvent() {
  R = this.value();
}

function inpWEvent() {
  W = this.value();
}

function inpPEvent() {
  P = this.value();
}

function inprEvent() {
  r = this.value();
}


function draw() {

  background(100);
  for (var n = 0; n < 100; n += 0.01) {
    var h = nfc((W / 100) * ((P * pow((1 + (r / 100) / 12), (n * 12))) + ((M * (R / 100)) / 12 * (pow((1 + (r / 100) / 12), (n * 12)) - 1) / ((r / 100) / 12))), 2);

    if (M - (M * (R / 100)) <= Math.floor((W / 100) * ((P * pow((1 + (r / 100) / 12), (n * 12))) + ((M * (R / 100)) / 12 * (pow((1 + (r / 100) / 12), (n * 12)) - 1) / ((r / 100) / 12))))) {
      t = n;
      break;
    }
  }
  beginShape();
  vertex(0,height);
  for (var n = 0; n <= 100; n += 2) {
    var h = (W / 100) * ((P * pow((1 + (r / 100) / 12), (n * 12))) + ((M * (R / 100)) / 12 * (pow((1 + (r / 100) / 12), (n * 12)) - 1) / ((r / 100) / 12)));
    var E = (W / 100) * ((P * pow((1 + (r / 100) / 12), (100 * 12))) + ((M * (R / 100)) / 12 * (pow((1 + (r / 100) / 12), (100 * 12)) - 1) / ((r / 100) / 12)))
    var y = map(h, 0, E, 0, height);
    stroke(255);
    fill(255);


    //rect(width - n * width / 100, height, width / 50, -y);
    vertex(width - n * width / 100,height-y);
  }
  vertex(0,height);
  endShape();

  textAlign(CENTER);
  fill(255);
  textSize(32);
  text(nfc(t, 2)+" years", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  var inputs = selectAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].size(80, 15);
    inputs[i].position(width / 2 - 40, height / 2 + 10 + (inputs[i].height + 2) * i);
  }
}