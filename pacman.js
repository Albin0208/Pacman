class Pacman extends PlayerObject {
  constructor() {
    super({ x: 9, y: 15 }, 2, "yellow");
    this.stored_dir = null;
    this.ableToMove = true;
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
    if (
      this.timeToMove(this.pixPos, this.direction) &&
      this.stored_dir != null
    ) {
      this.direction = this.stored_dir;
      this.ableToMove = this.checkWallCollision(this.gridPos, this.direction);
      this.checkPacDots();
      this.checkPortal();
    }

    this.setGridPos();
  }

  /**
   * Sätt vilken riktning pacman ska ta när han kan svänga
   *
   * @param {int} xdir riktiningen i x-led
   * @param {int} ydir riktiningen i y-led
   */
  setDir(xdir, ydir) {
    this.stored_dir = { x: xdir, y: ydir };
  }

  /**
   * Kollar om pacman ätit mat
   */
  checkPacDots() {
    var pacDotType = this.maze.eatPacdot(this.gridPos);

    if (pacDotType)
      if (pacDotType == "normal") {
        this.score += 10;
      } else if (pacDotType == "mega") {
        this.score += 50;
        //TODO Gör spökerna rädda
      }
    pacDotType = null;
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

  /**
   * Koll om det går att flytta till nästa ruta i rutnätet
   *
   * @param {object} gridPos Positionen i rutnätet
   * @param {object} direction Riktningen på spelaren
   * @return {bool} Om det går att flytta sig till rutan
   */
  checkWallCollision(gridPos, direction) {
    if (gridPos.x < 18 && gridPos.x > 0) {
      var type = this.maze.map[gridPos.y + direction.y][gridPos.x + direction.x]
        .type;
      return type != "wall" && type != "gate";
    }
    return true;
  }
}
