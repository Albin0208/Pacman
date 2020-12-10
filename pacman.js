class Pacman extends PlayerObject {
  constructor(maze, map) {
    super({ x: 9, y: 15 }, PACMANSPEED, "yellow", maze, map);
    this.stored_dir = null;
    this.score = 0;
  }

  /**
   * Uppdatera pacmans info
   */
  update() {
    //Om man kan flytta
    if (this.ableToMove) {
      this.move();
    }
    if (this.timeToMove() && this.stored_dir != null) {
      this.direction = this.stored_dir;
      this.ableToMove = this.checkWallCollision();
      this.checkPacDots();
      this.checkPortal();
    }
    this.setGridPos();
  }

  /**
   * Sätt vilken riktning pacman ska ta när han kan svänga
   *
   * @param {number} xdir riktiningen i x-led
   * @param {number} ydir riktiningen i y-led
   */
  setDir(xdir, ydir) {
    this.stored_dir = { x: xdir, y: ydir };
  }

  /**
   * Kollar om pacman ätit mat
   */
  checkPacDots() {
    var pacDotType = this.maze.eatPacdot(this.gridPos);

    if (pacDotType == NORMAL) {
      this.score += 10;
    } else if (pacDotType == POWERPILL) {
      this.score += 50;
      this.maze.megaEaten = true;
      this.timer.start(7, () => {
        this.maze.megaEaten = false;
      });
    }
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
      this.pixPos.x = this.gridPos.x * SCL;
    }
  }

  checkValidGridPosistion(type) {
    return type != WALL && type != GATE;
  }

  returnScore() {
    return this.score > 0 ? this.score : 0;
  }
}
