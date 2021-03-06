/**
 * Klass med grundfunktioner för spelarobjekt
 */
class PlayerObject {
  constructor(gridPos, speed, color, maze) {
    this.gridPos = gridPos;
    this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
    this.direction = { x: 0, y: 0 };
    this.maze = maze;
    this.r = 12;
    this.speed = speed;
    this.color = color;
    this.ableToMove = true;
    this.timer = new Timer();
  }

  /**
   * Rita ut spelaren
   */
  show() {
    fill(this.color);
    circle(this.pixPos.x + SCL / 2, this.pixPos.y + SCL / 2, this.r * 2);
  }

  /**
   * Flytta spelaren i en riktning med en hastighet
   */
  move() {
    this.pixPos.x += this.direction.x * this.speed;
    this.pixPos.y += this.direction.y * this.speed;
  }

  /**
   * Sätter grid positionen i förhållande till pixel positionen
   */
  setGridPos() {
    this.gridPos.x = floor((this.pixPos.x + SCL / 2) / SCL);
    this.gridPos.y = floor((this.pixPos.y + SCL / 2) / SCL);
  }

  /**
   * Kolla om en karaktär är i mitten av rutan
   *
   * @returns {boolean} Om karaktären är i mitten av rutan
   */
  timeToMove() {
    return (
      (this.direction.y == 0 && this.pixPos.x % SCL == 0) ||
      (this.direction.x == 0 && this.pixPos.y % SCL == 0)
    );
  }

  /**
   * Koll om det går att flytta till nästa ruta i rutnätet
   *
   * @returns {boolean} Om det går att flytta sig till rutan
   */
  checkWallCollision() {
    if (this.gridPos.x < 18 && this.gridPos.x > 0) {
      var type = this.maze.map[this.gridPos.y + this.direction.y][
        this.gridPos.x + this.direction.x
      ].type;
      return this.checkValidGridPosistion(type);
    }
    return true;
  }

  /**
   * Kolla om nästa position är en giltig ruta,
   * som spelaren kan flyttas till
   *
   * @param {string} type vilken typ av ruta det är
   *
   * @returns {boolean} Om nästa ruta är gilitig
   */
  checkValidGridPosistion(type) {
    return type != WALL;
  }

  /**
   * Kolla om spelaren är vid en portal,
   * om så är fallet flytta spelaren till andra sidan
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

  /**
   * Sätter Gameover
   */
  gameOver() {
    this.maze.gameOver = true;
  }
}
