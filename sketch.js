let maze, pacman, scoreText;
// let bg;
const scl = 30;

// function preload() {
//   bg = loadImage("/img/background.png");
// }

function setup() {
  createCanvas(19 * scl, 21 * scl);
  textSize(30);
  // createCanvas(23 * scl, 25 * scl);
  maze = new Maze();
  pacman = new Pacman(maze);
  maze.initializeFood();
  // image(bg, 0, 0, width, height);
}

/**
 * Rita ut allt på canvas
 */
function draw() {
  background(0);
  maze.show();
  fill(255);
  scoreText = pacman.score;
  text("Score: " + scoreText, scl, scl - 5);
  pacman.update();
  pacman.show();
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
