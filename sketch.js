let maze, pacman;
const scl = 30;

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
  if (key === "a") pacman.move(-1, 0);
  else if (key === "d") pacman.move(1, 0);
  else if (key === "w") pacman.move(0, -1);
  else if (key === "s") pacman.move(0, 1);
}
