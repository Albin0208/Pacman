let map, pacman;
let scl = 30;

function setup() {
  createCanvas(17 * scl, 21 * scl);
  map = new Map();
  pacman = new Pacman();
}

function draw() {
  background(0);
  map.show();
  pacman.show();
}
