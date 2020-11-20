class Ghosts extends PlayerObject {
  constructor(pacPos, map) {
    super({ x: 9, y: 9 }, 2, "red");
    this.pacPos = pacPos;
    this.targetPos = pacPos;
    this.behaviour = CHASE;
    this.pathSearch = new Astar(map);
    this.bestPath;
    this.vurnable = false;
    this.goHome = false;
  }

  /**
   * Uppdatera spökets info
   */
  update() {
    if (this.behaviour != EATEN) {
      if (this.maze.megaEaten) {
        this.setBehaviour(SCARED);
      }
      if (!this.maze.megaEaten && this.checkPacmanCollision()) gameOver = true;
      else if (this.vurnable && this.checkPacmanCollision())
        this.setBehaviour(EATEN);
    }
    if (this.ableToMove) this.move();

    if (this.timeToMove()) {
      this.setPath();
      this.setDir();
      this.ableToMove = this.checkWallCollision(this.gridPos, this.direction);
    }
    this.setGridPos();
  }

  /**
   * Sätt spökets riktning
   */
  setDir() {
    if (this.bestPath[0]) {
      this.direction.x = this.bestPath[0].position.x - this.gridPos.x;
      this.direction.y = this.bestPath[0].position.y - this.gridPos.y;
    }
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
   * Kolla om spöket kolliderat med pacman
   *
   * @returns {boolean} Om spöket kolliderat med pacman
   */
  checkPacmanCollision() {
    //Räknar antalet pixlar mellan två punkter
    var d = dist(
      this.pacPos.x * SCL,
      this.pacPos.y * SCL,
      this.pixPos.x,
      this.pixPos.y
    );
    return d < this.r * 2 ? true : false;
  }

  /**
   * Bestämmer hur spöket ska röra sig och med vilken hastighet
   *
   * @param {string} behaviour
   */
  setBehaviour(behaviour) {
    switch (behaviour) {
      case SCARED:
        console.log("target", this.targetPos);
        console.log("grid", this.gridPos);
        if (
          (this.targetPos.x == this.gridPos.x &&
            this.targetPos.y == this.gridPos.y) ||
          this.targetPos == this.pacPos
        )
          this.targetPos = this.randPos();
        this.speed = 1;
        this.vurnable = true;
        break;

      case CHASE:
        this.targetPos = this.pacPos;
        break;

      case SCATTER:
        break;

      case EATEN:
        this.targetPos = { x: 9, y: 9 };
        this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
        this.speed = 3;
        this.behaviour = EATEN;
        this.direction = { x: 0, y: 0 };
        break;
    }
  }

  /**
   * Slumpar fram en ruta på rutnätet
   *
   * @returns {object} Den nya positionen
   */
  randPos() {
    var xPos, yPos;

    //Ser till så att den nya positionen inte är en vägg
    do {
      xPos = floor(random(1, 19));
      yPos = floor(random(1, 21));
    } while (this.maze.map[yPos][xPos].type == WALL);

    return { x: xPos, y: yPos };
  }
}
