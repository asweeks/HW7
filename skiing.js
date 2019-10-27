var trees3 = [];
var treesy = [];
var snow = [];
var speed = 4;

function preload() {
  soundFormats("m4a");
  sound1 = loadSound("Sking2.m4a");
  sound2 = loadSound("Sking2.m4a");
  sound3 = loadSound("Sking2.m4a");
  img = loadImage('pineTreeShadow.png');
  img2 = loadImage('skierFront.png');
  img3 = loadImage('skierRight.png');
  img4 = loadImage('skierLeft.png');
  img5 = loadImage('crash.png');
  img6 = loadImage('levelComp.png');
  img7 = loadImage('gameOver.png');
  img8 = loadImage('finishLine.png');
}

var ski = {
  x: 100,
  y: 100,
  w: 50,
  h: 80,
  s: 7,
}

function setup() {
  createCanvas(400, 600);
  imageMode(CENTER);
  // sound1.playMode('restart');
  // sound2.playMode('restart');
  // sound3.playMode('restart');
  // setVolume(0.5);
  for (var i = 20; i <= 1000; i = i + 10) {
    trees3.push(random(10, width - 10));
  }
  for (var i = 20; i <= 10000; i = i + 100) {
    treesy.push(i + 700);
  }
  for (var i = 20; i <= 1000; i = i + 10) {
    snow.push(random(10, width - 10));
  }


}

function draw() {
  background(220);
  textSize(100);
// if (!sound1.isPlaying() == true) {
//       sound1.play();
//}
  image(img8, width / 2, 1000 + treesy[95], 380, 170) //fin line

  for (var i = 0; i < snow.length; i++) { //draws snow particles
    noStroke();
    fill(211, 211, 211);
    rect(snow[i], treesy[i], 10, 10);
    fill(255, 255, 255);
    rect(snow[i] + 50, treesy[i] - 75, 10, 10);
    fill(200, 200, 200);
    rect(snow[i] - 75, treesy[i] + 75, 10, 10);
    fill(200, 200, 200);
    rect(snow[i] + 100, treesy[i] + 30, 10, 10);
    treesy[i] -= 2;
  }

  if (keyIsDown(LEFT_ARROW)) { //moves skier to left
    sound2.stop();
    sound3.stop();
    if (ski.x < 20) {
      ski.x = 20;
    }
    if (!sound1.isPlaying() == true) {
      sound1.play();
    }
    image(img4, ski.x, ski.y, ski.w, ski.h);
    ski.x -= ski.s;
  } else {
    if (keyIsDown(RIGHT_ARROW)) { //moves skier to right
      sound1.stop();
      sound3.stop();
      if (ski.x > width - 20) {
        ski.x = width - 20;
      }
      if (!sound2.isPlaying() == true) {
        sound2.play();
      }
      image(img3, ski.x, ski.y, ski.w, ski.h);
      ski.x += ski.s;
    } else {
      sound1.stop();
      sound2.stop();
      image(img2, ski.x, ski.y, ski.w, ski.h);
      if (!sound3.isPlaying() == true) {
        sound3.play();

      }

    }
  }

  if (treesy[treesy.length - 2] + 50 < 5) { //stops loop when trees run out
    ski.y++;
    if (ski.y > 200) {
      rect(0, 350, 400, 120);
      image(img6, width / 2, 400, 375, 150);
      noLoop();
    }
  }
  for (var x = 0; x < trees3.length; x++) { //detects if skier comes within tree range and crashes
    if (dist(trees3[x], treesy[x], ski.x, ski.y) < 40) {
      image(img5, ski.x - 20, ski.y, ski.w + 50, ski.h);
    }
  }
  for (var i = 0; i < trees3.length; i++) { //draw trees
    image(img, trees3[i], treesy[i], 200, 200)
    treesy[i] -= speed;
  }
  for (var x = 0; x < trees3[x]; x++) { //game over if crash
    if (dist(trees3[x], treesy[x], ski.x, ski.y) < 40) {
      fill(255, 255, 255);
      rect(0, 165, 1000, 100);
      image(img7, width / 2 - 120, 100, 500, 300);
      // image(img5, ski.x - 20, ski.y, ski.w + 50, ski.h);
      sound1.stop();
      noLoop();
    }
  }
}
