class Pacman {
  constructor(maze) {
    this.gridPos = { x: 9, y: 15 };
    this.pixPos = { x: this.gridPos.x * scl, y: this.gridPos.y * scl };
    this.r = 12;
    this.speed = 2;
    this.direction = { x: 0, y: 0 };
    this.stored_dir = null;
    this.maze = maze;
    this.ableToMove = true;
  }

  show() {
    fill(255, 255, 0);
    circle(this.pixPos.x + scl / 2, this.pixPos.y + scl / 2, this.r * 2);
    noFill();
    stroke(255, 0, 0);
    // rect(this.gridPos.x * scl, this.gridPos.y * scl, scl);
  }

  update() {
    if (this.ableToMove) {
      this.pixPos.x += this.direction.x * this.speed;
      this.pixPos.y += this.direction.y * this.speed;
    }

    if (this.timeToMove() && this.stored_dir != null) {
      this.direction = this.stored_dir;
      this.ableToMove = this.canMove();
    }

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
  }

  /**
   * Koll om nästa ruta i maze är en vägg
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
}
