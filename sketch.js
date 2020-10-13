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
  pacman.update();
}

function keyTyped() {
  if (key === "a") pacman.setdir(-1, 0);
  else if (key === "d") pacman.setdir(1, 0);
  else if (key === "w") pacman.setdir(0, -1);
  else if (key === "s") pacman.setdir(0, 1);
}
