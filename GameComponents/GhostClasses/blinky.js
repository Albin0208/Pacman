class Blinky extends Ghost {
  constructor(pacman, maze) {
    super(pacman, BLINKYPROPERTIES, maze);
    this.type = "blinky";
  }

  /**
   * Sätter spökets targetposition
   */
  setTarget() {
    if (this.behaviour != CHASE) return;

    this.targetPos = this.pacman.gridPos;
  }
}
