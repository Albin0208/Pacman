let maze, pacman;
let scl = 30;

function setup() {
  createCanvas(19 * scl, 21 * scl);
  maze = new Maze();
  pacman = new Pacman(maze);
}

function draw() {
  background(0);
  maze.show();
  pacman.update();
  pacman.show();
}

function keyPressed() {
  if (key === "a") pacman.handleMovement(-1, 0);
  else if (key === "d") pacman.handleMovement(1, 0);
  else if (key === "w") pacman.handleMovement(0, -1);
  else if (key === "s") pacman.handleMovement(0, 1);
}
