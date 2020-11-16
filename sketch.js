let maze, pacman, scoreText;
const scl = 30;
let gameOver = false;
let cols = 19;
let rows = 21;

/**
 * Ladda in spelet
 */
function setup() {
  createCanvas(cols * scl, rows * scl);
  textSize(30);
  maze = new Maze();
  pacman = new Pacman();
  enemy = new Ghosts(pacman.gridPos, maze.map);
  maze.initGame();
}

/**
 * Rita ut allt på canvas
 */
function draw() {
  if (gameOver) {
    fill(255);
    textAlign(CENTER);
    text("Tryck på F5 för att spela igen", width / 2, height / 2);
  } else {
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
}

/**
 * När en knapp trycks på kolla om den knappen ska flytta pacman,
 * isåfall sätt riktningen för pacman enligt knappen
 */
function keyTyped() {
  //Gör om key till små bokstäver om man av misstag tryckt på capslock
  switch (key.toLowerCase()) {
    case "a":
      pacman.setDir(-1, 0);
      break;

    case "d":
      pacman.setDir(1, 0);
      break;

    case "w":
      pacman.setDir(0, -1);
      break;

    case "s":
      pacman.setDir(0, 1);
      break;

    default:
      break;
  }
}
