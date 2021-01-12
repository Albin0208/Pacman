class Clyde extends Ghost {
  constructor(pacman, maze) {
    super(pacman, CLYDEPROPERTIES, maze);
    this.type = "clyde";
  }

  /**
   * Sätter spökets targetposition
   */
  setTarget() {
    if (this.behaviour != CHASE) return;

    this.targetPos =
      this.bestPath?.length > 8 ? this.pacman.gridPos : this.scatterPos;

    //Temporär ritning av Clydes targetposition
    push();
    fill(this.defaultColor);
    rect(this.targetPos.x * SCL, this.targetPos.y * SCL, SCL);
    pop();
  }
}
