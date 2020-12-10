class Main {
  constructor() {
    this.maze = new Maze();
    // this.pacman;
    this.gameOver;
  }

  run() {
    this.maze.initGame();
    this.pacman = new Pacman(this.maze);
    this.blinky = new Blinky(this.pacman.gridPos, this.maze);
    this.inky = new Inky(this.pacman.gridPos, this.maze);
    this.pinky = new Pinky(this.pacman.gridPos, this.maze);
    this.clyde = new Clyde(this.pacman.gridPos, this.maze);
  }

  displayGame() {
    if (this.gameOver) {
      fill(255);
      textAlign(CENTER);
      text("Tryck på F5 för att spela igen", width / 2, height / 2);
    } else {
      this.maze.show();
      fill(255);
      text("Score: " + this.pacman.returnScore(), SCL + 4, SCL - 5);
      this.pacman.show();
      this.blinky.show();
      this.inky.show();
      this.pinky.show();
      this.clyde.show();
    }
  }

  updateGame() {
    this.pacman.update();
    this.blinky.update();
    this.inky.update();
    this.pinky.update();
    this.clyde.update();
  }
}
