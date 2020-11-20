class PlayerObject {
  constructor(gridPos, speed, color) {
    this.gridPos = gridPos;
    this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
    this.direction = { x: 0, y: 0 };
    this.maze = maze;
    this.r = 12;
    this.speed = speed;
    this.color = color;
    this.ableToMove = true;
  }

  /**
   * Rita ut spelaren
   */
  show() {
    fill(this.color);
    circle(this.pixPos.x + SCL / 2, this.pixPos.y + SCL / 2, this.r * 2);

    //Temporär ritning av vägen till målpunkten
    if (this.bestPath)
      this.bestPath.forEach((node) => {
        fill(this.color);
        circle(
          node.position.x * SCL + SCL / 2,
          node.position.y * SCL + SCL / 2,
          6
        );
      });
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
   * @param {object} gridPos Positionen i rutnätet
   * @param {object} direction Riktningen på spelaren
   * @return {boolean} Om det går att flytta sig till rutan
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

  checkValidGridPosistion(type) {
    return type != WALL;
  }
}
