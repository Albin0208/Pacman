const runGame = new Game();

/**
 * Ladda in spelet
 */
function setup() {
  createCanvas(COLS * SCL, ROWS * SCL);
  textSize(30);
  runGame.run();
}

/**
 * Rita ut allt på canvas
 */
function draw() {
  background(0);
  runGame.displayGame();
  runGame.updateGame();
}

/**
 * När en knapp trycks på kolla om den knappen ska flytta pacman,
 * isåfall sätt riktningen för pacman enligt knappen
 */
function keyTyped() {
  //Gör om key till små bokstäver så att det går att spela även med capslock på
  switch (key.toLowerCase()) {
    case "a":
      runGame.pacman.setDir(-1, 0);
      break;

    case "d":
      runGame.pacman.setDir(1, 0);
      break;

    case "w":
      runGame.pacman.setDir(0, -1);
      break;

    case "s":
      runGame.pacman.setDir(0, 1);
      break;
  }
}
