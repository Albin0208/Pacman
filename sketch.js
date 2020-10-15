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
  // pacman.move();
  pacman.show();
}

function keyPressed() {
  if (key === "a") pacman.handleMovement(-1, 0);
  else if (key === "d") pacman.handleMovement(1, 0);
  else if (key === "w") pacman.handleMovement(0, -1);
  else if (key === "s") pacman.handleMovement(0, 1);
  // if (key === "a") pacman.setdir(-1, 0);
  // else if (key === "d") pacman.setdir(1, 0);
  // else if (key === "w") pacman.setdir(0, -1);
  // else if (key === "s") pacman.setdir(0, 1);
  // if (key === "a") pacman.move(-30, 0);
  // else if (key === "d") pacman.move(30, 0);
  // else if (key === "w") pacman.move(0, -30);
  // else if (key === "s") pacman.move(0, 30);
}

// function keyReleased() {
//   if (key === "a") pacman.setdir(0, 0);
//   else if (key === "d") pacman.setdir(0, 0);
//   else if (key === "w") pacman.setdir(0, 0);
//   else if (key === "s") pacman.setdir(0, 0);
// }
