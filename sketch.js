let maze, pacman, scoreText;
let gameOver = false;

/**
 * Ladda in spelet
 */
function setup() {
  createCanvas(COLS * SCL, ROWS * SCL);
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
    text("Score: " + pacman.score, SCL + 4, SCL - 5);
    pacman.update();
    enemy.update();
    pacman.show();
    enemy.show();
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
