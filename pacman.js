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
  }

  /**
   * Uppdatera pacmans position
   */
  update() {
    //Om man kan flytta, gör det i riktiningen och med en viss hastighet
    if (this.ableToMove) {
      this.pixPos.x += this.direction.x * this.speed;
      this.pixPos.y += this.direction.y * this.speed;
    }

    if (this.timeToMove() && this.stored_dir != null) {
      this.direction = this.stored_dir;
      this.ableToMove = this.maze.checkWallCollision(
        this.gridPos,
        this.direction
      );
      this.checkPacDots();
      this.checkPortal();
    }

    //Sätter grid positionen i förhållande till pixel positionen
    this.gridPos.x = floor((this.pixPos.x + scl / 2) / scl);
    this.gridPos.y = floor((this.pixPos.y + scl / 2) / scl);
  }

  /**
   * Sätt vilken riktning pacman ska ta när han kan svänga
   *
   * @param {int} xdir riktiningen i x-led
   * @param {int} ydir riktiningen i y-led
   */
  move(xdir, ydir) {
    this.stored_dir = { x: xdir, y: ydir };
  }

  /**
   * Kolla om pacman är i mitten av rutan
   * @returns Om pacman är i mitten av rutan
   */
  timeToMove() {
    return (
      (this.pixPos.x % scl == 0 && this.direction.y == 0) ||
      (this.pixPos.y % scl == 0 && this.direction.x == 0)
    );
  }

  /**
   * Kollar om pacman ätit mat,
   * om så är fallet öka score med 10
   */
  checkPacDots() {
    if (this.maze.eatPacdot(this.gridPos)) this.score += 10;
  }

  /**
   * Kolla om pacman är vid en portal,
   * om så är fallet flytta pacman till andra sidan
   */
  checkPortal() {
    if (this.gridPos.y == 9) {
      if (this.gridPos.x < 0) {
        this.gridPos.x = 19;
        this.stored_dir.x = -1;
      } else if (this.gridPos.x > 18) {
        this.gridPos.x = -1;
        this.stored_dir.x = 1;
      }
      this.pixPos.x = this.gridPos.x * scl;
    }
  }
}
