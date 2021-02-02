class Clyde extends Ghost {
  constructor(pacman, maze) {
    super(pacman, CLYDEPROPERTIES, maze);
  }

  /**
   * Sätter spökets targetposition
   */
  setTarget() {
    if (this.behaviour != CHASE) return;

    this.targetPos =
      this.bestPath?.length > 8 ? this.pacman.gridPos : this.scatterPos;
  }
}
