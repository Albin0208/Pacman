class Ghosts extends PlayerObject {
  constructor(pacPos, map) {
    super({ x: 9, y: 9 }, 2, "red");
    this.pacPos = pacPos;
    this.targetPos = pacPos;
    this.behaviour = "chase";
    this.pathSearch = new Astar(map);
    this.bestPath;
  }

  /**
   * Uppdatera spökets info
   */
  update() {
    if (
      this.timeToMove(this.pixPos, this.direction) &&
      this.gridPos != this.targetPos
    ) {
      this.setPath();
      this.setDir();
    }

    if (!this.checkPacmanCollision()) {
      this.move();
    } else {
      gameOver = true;
      return;
    }

    this.setGridPos();
  }

  /**
   * Sätt spökets riktning
   */
  setDir() {
    this.direction.x = this.bestPath[0].position.x - this.gridPos.x;
    this.direction.y = this.bestPath[0].position.y - this.gridPos.y;
  }

  /**
   * Använd a* (astar) sökalgoritm för att hitta kortaste vägen till en målpunkt
   */
  setPath() {
    if (this.targetPos) {
      var temp = this.pathSearch.astar(this.gridPos, this.targetPos);
      if (temp != null) this.bestPath = temp;
    }
  }

  /**
   * Kolla hur långt ifrån spöket är från pacman
   */
  checkPacmanCollision() {
    var d = dist(
      this.pacPos.x * scl,
      this.pacPos.y * scl,
      this.pixPos.x,
      this.pixPos.y
    );
    return d < this.r ? true : false;
  }
}
