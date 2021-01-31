/**
 * Beteendeklass för spökena
 */
class GhostBehaviour {
  constructor(ghost) {
    this.ghost = ghost;
  }

  /**
   * Hur spöket ska bete sig när den är rädd
   */
  setScared() {
    if (
      (this.ghost.targetPos.x == this.ghost.gridPos.x &&
        this.ghost.targetPos.y == this.ghost.gridPos.y) ||
      this.ghost.targetPos == this.ghost.pacman.gridPos ||
      this.ghost.behaviour != SCARED
    )
      this.ghost.targetPos = this.ghost.randPos();

    //Invertera spöket riktning
    if (this.ghost.behaviour != SCARED) {
      this.ghost.direction.x -= -this.ghost.previousPos.x;
      this.ghost.direction.y -= -this.ghost.previousPos.y;
      this.ghost.color = SCAREDCOLOR;
      this.ghost.speed = SCAREDSPEED;
      this.ghost.behaviour = SCARED;
    }
  }

  /**
   * Hur spöket ska bete sig när den jagar pacman
   */
  setChase() {
    this.ghost.color = this.ghost.defaultColor;
    this.ghost.behaviour = CHASE;
    this.ghost.speed = CHASESPEED;
    this.ghost.setTarget();
  }

  /**
   * Hur spöket ska bete sig när pacman ska få andrum
   */
  setScatter() {
    this.ghost.color = this.ghost.defaultColor;
    this.ghost.behaviour = SCATTER;
    this.ghost.speed = SCATTERSPEED;
    this.ghost.targetPos = this.ghost.scatterPos;
  }

  /**
   * Hur spöket ska bete sig när den har blivit uppäten
   */
  setEaten() {
    this.ghost.color = EATENCOLOR;
    this.ghost.targetPos = GHOSTHOMEPOSITION;
    this.ghost.speed = EATENSPEED;
    this.ghost.behaviour = EATEN;
    this.ghost.direction = { x: 0, y: 0 };
  }
}
