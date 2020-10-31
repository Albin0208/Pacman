let maze, pacman, scoreText;
const scl = 30;
let cols = 19;
let rows = 21;

function setup() {
  createCanvas(cols * scl, rows * scl);
  textSize(30);
  maze = new Maze();
  pacman = new Pacman(maze);
  enemy = new Ghosts(pacman.gridPos, maze);
  maze.initGame();
  maze.initializePacdots();
}

/**
 * Rita ut allt på canvas
 */
function draw() {
  background(0);
  maze.show();
  fill(255);
  scoreText = pacman.score;
  text("Score: " + scoreText, scl + 4, scl - 5);
  pacman.update();
  pacman.show();
  enemy.update();
  enemy.show();
}

/**
 * När en knapp trycks på kolla om den knappen ska flytta pacman,
 * isåfall sätt riktningen för pacman enligt knappen
 */
function keyTyped() {
  if (key === "a") pacman.move(-1, 0);
  else if (key === "d") pacman.move(1, 0);
  else if (key === "w") pacman.move(0, -1);
  else if (key === "s") pacman.move(0, 1);
}
