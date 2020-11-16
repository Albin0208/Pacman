class PlayerObject {
  constructor(gridPos, speed, color) {
    this.gridPos = gridPos;
    this.pixPos = { x: this.gridPos.x * scl, y: this.gridPos.y * scl };
    this.direction = { x: 0, y: 0 };
    this.maze = maze;
    this.r = 12;
    this.speed = speed;
    this.color = color;
  }

  /**
   * Rita ut spelaren
   */
  show() {
    fill(this.color);
    circle(this.pixPos.x + scl / 2, this.pixPos.y + scl / 2, this.r * 2);

    //Temporär ritning av vägen till pacman
    if (this.bestPath)
      this.bestPath.forEach((node) => {
        fill(this.color);
        circle(
          node.position.x * scl + scl / 2,
          node.position.y * scl + scl / 2,
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
    this.gridPos.x = floor((this.pixPos.x + scl / 2) / scl);
    this.gridPos.y = floor((this.pixPos.y + scl / 2) / scl);
  }

  /**
   * Kolla om en karaktär är i mitten av rutan
   * @returns {bool} Om karaktären är i mitten av rutan
   */
  timeToMove(pixPos, direction) {
    return (
      (pixPos.x % scl == 0 && direction.y == 0) ||
      (pixPos.y % scl == 0 && direction.x == 0)
    );
  }
}
