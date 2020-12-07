let maze, pacman, inky, blinky, pinky, clyde;
let score = 0;
let gameOver = false;

/**
 * Ladda in spelet
 */
function setup() {
  createCanvas(COLS * SCL, ROWS * SCL);
  textSize(30);
  maze = new Maze();
  pacman = new Pacman();
  // enemy = new Ghost(pacman.gridPos, maze.map);
  // enemy = new Clyde(pacman.gridPos);
  // blinky = new Blinky(pacman.gridPos);
  createGhosts();
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
    text("Score: " + score, SCL + 4, SCL - 5);
    pacman.update();
    updateGhosts();
    // enemy.update();
    // blinky.update();
    pacman.show();
    showGhosts();
    // enemy.show();
    // blinky.show();
  }
}

/**
 * När en knapp trycks på kolla om den knappen ska flytta pacman,
 * isåfall sätt riktningen för pacman enligt knappen
 */
function keyTyped() {
  //Gör om key till små bokstäver så att det går att spela även med capslock på
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
  }
}

function createGhosts() {
  inky = new Inky(pacman.gridPos);
  blinky = new Blinky(pacman.gridPos);
  pinky = new Pinky(pacman.gridPos);
  clyde = new Clyde(pacman.gridPos);
}

function updateGhosts() {
  inky.update();
  blinky.update();
  pinky.update();
  clyde.update();
}

function showGhosts() {
  inky.show();
  blinky.show();
  pinky.show();
  clyde.show();
}
