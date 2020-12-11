class Game {
  constructor() {
    this.gameOver = false;
    this.maze = new Maze(this.gameOver);
  }

  /**
   * Starta spelet
   */
  run() {
    this.maze.initGame();
    this.pacman = new Pacman(this.maze);
    this.blinky = new Blinky(this.pacman.gridPos, this.maze);
    this.inky = new Inky(this.pacman.gridPos, this.maze);
    this.pinky = new Pinky(this.pacman.gridPos, this.maze);
    this.clyde = new Clyde(this.pacman.gridPos, this.maze);
  }

  /**
   * Rita ut alla spelkomponenter
   */
  displayGame() {
    this.maze.show();
    this.pacman.show();
    this.blinky.show();
    this.inky.show();
    this.pinky.show();
    this.clyde.show();
    if (this.maze.returnGameOver()) {
      this.displayGameOver();
    } else {
      fill(255);
      text("Score: " + this.pacman.returnScore(), SCL + 4, SCL - 5);
    }
  }

  /**
   * Uppdatera alla spelkomponenter
   */
  updateGame() {
    if (!this.maze.returnGameOver()) {
      this.pacman.update();
      this.blinky.update();
      this.inky.update();
      this.pinky.update();
      this.clyde.update();
    }
  }

  /**
   * Visa gameOver
   */
  displayGameOver() {
    fill(255);
    textAlign(CENTER);
    text("Score: " + this.pacman.returnScore(), width / 2, height / 3);
    text("Tryck på F5 för att spela igen", width / 2, height / 2);
  }
}
