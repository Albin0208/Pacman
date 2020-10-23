class Pacman {
  constructor(maze) {
    this.gridPos = { x: 9, y: 15 };
    this.pixPos = { x: this.gridPos.x * scl, y: this.gridPos.y * scl };
    this.r = 12;
    this.speed = 2;
    this.direction = { x: 0, y: 0 };
    this.stored_dir = null;
    this.ableToMove = true;
    this.score = 0;
    this.maze = maze;
  }

  /**
   * Rita ut pacman
   */
  show() {
    fill(255, 255, 0);
    circle(this.pixPos.x + scl / 2, this.pixPos.y + scl / 2, this.r * 2);
    // noFill();
    // stroke(255, 0, 0);
    // rect(this.gridPos.x * scl, this.gridPos.y * scl, scl);
  }

  update() {
    //Om man kan flytta, gör det i riktiningen och med en viss hastighet
    if (this.ableToMove) {
      this.pixPos.x += this.direction.x * this.speed;
      this.pixPos.y += this.direction.y * this.speed;
    }

    if (this.timeToMove() && this.stored_dir != null) {
      this.direction = this.stored_dir;
      this.ableToMove = this.canMove();
      this.checkFood();
    }

    //Sätter grid positionen i förhållande till pixel positionen
    this.gridPos.x = floor((this.pixPos.x + scl / 2) / scl);
    this.gridPos.y = floor((this.pixPos.y + scl / 2) / scl);
  }

  move(xdir, ydir) {
    this.stored_dir = { x: xdir, y: ydir };
  }

  /**
   * Kolla om den är i mitten av rutan
   * @returns Om den är i mitten av rutan
   */
  timeToMove() {
    if (this.pixPos.x % scl == 0 && this.direction.y == 0) return true;
    if (this.pixPos.y % scl == 0 && this.direction.x == 0) return true;
    return false;
  }

  /**
   * Koll om det går att flytta till nästa ruta i rutnätet
   * @return Om det går att flytta sig till rutan
   */
  canMove() {
    if (
      this.maze.grid[this.gridPos.y + this.direction.y][
        this.gridPos.x + this.direction.x
      ] == 0
    )
      return false;
    return true;
  }

  /**
   * Kollar om pacman ätit mat,
   * om så är fallet öka score med 10
   */
  checkFood() {
    if (this.maze.eatFood(this.gridPos)) this.score += 10;
  }
}
