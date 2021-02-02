/**
 * Klass för pacmansfunktioner
 */
class Pacman extends PlayerObject {
  constructor(maze) {
    super(PACMANSTARTPOS, PACMANSPEED, PACMANCOLOR, maze);
    this.stored_dir = null;
    this.score = 0;
    this.ghostsEaten = 0;
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
    var pacDotType = this.maze.checkPacdot(this.gridPos);

    if (pacDotType == NORMAL) {
      this.score += 10;
    } else if (pacDotType == POWERPILL) {
      this.score += 50;
      if (this.maze.megaEaten) this.maze.megaRefill = true;
      this.maze.megaEaten = true;
      this.timer.start(7, () => {
        this.maze.megaEaten = false;
        this.maze.megaRefill = false;
        this.ghostsEaten = 0;
      });
    }
  }

  /**
   * Kolla om nästa position är en giltig ruta,
   * som pacman kan flyttas till
   *
   * @param {string} type
   */
  checkValidGridPosistion(type) {
    return type != WALL && type != GATE;
  }

  /**
   * Returnerar hur mycket poäng pacman har
   *
   * @returns {number} Pacmans poäng
   */
  returnScore() {
    return this.score > 0 ? this.score : 0;
  }

  /**
   * Bestäm poängen om ett spöke har blivit uppätet
   */
  ghostEaten() {
    if (this.maze.megaEaten) {
      switch (this.ghostsEaten) {
        case 0:
          this.score += 200;
          this.ghostsEaten++;
          break;

        case 1:
          this.score += 400;
          this.ghostsEaten++;
          break;

        case 2:
          this.score += 600;
          this.ghostsEaten++;
          break;

        default:
          this.score += 800;
          this.ghostsEaten++;
          break;
      }
    }
  }
}
