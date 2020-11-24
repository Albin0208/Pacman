class Ghosts extends PlayerObject {
  constructor(pacPos, scatterPos) {
    super({ x: 9, y: 9 }, 2, "red");
    this.pacPos = pacPos;
    this.targetPos = pacPos;
    this.behaviour = CHASE;
    this.pathSearch = new Astar(this.maze.map);
    this.bestPath;
    this.vurnable = false;
    // this.scatterPos = this.scatterPos;
    // this.scatterPos = { x: 17, y: 1 };
    // this.scatterPos = { x: 17, y: 19 };
    // this.scatterPos = { x: 1, y: 19 };
    this.scatterPos = { x: 1, y: 1 };
  }

  /**
   * Uppdatera spökets info
   */
  update() {
    // this.setBehaviour(SCATTER);
    if (this.behaviour != EATEN) {
      if (this.maze.megaEaten) {
        this.setBehaviour(SCARED);
      } else {
        this.setBehaviour(CHASE);
      }
      if (this.checkPacmanCollision()) {
        if (this.vurnable) {
          this.setBehaviour(EATEN);
        } else {
          gameOver = true;
        }
      }
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
      var temp = this.pathSearch.astar(
        this.gridPos,
        this.targetPos,
        this.direction
      );
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
        if (
          (this.targetPos.x == this.gridPos.x &&
            this.targetPos.y == this.gridPos.y) ||
          this.targetPos == this.pacPos
        )
          this.targetPos = this.randPos();
        this.speed = SCAREDSPEED;
        this.vurnable = true;
        //Invertera spöket riktning
        if (this.behaviour != SCARED) {
          this.direction.x -= this.direction.x * 2;
          this.direction.y -= this.direction.y * 2;
        }
        this.behaviour = SCARED;
        break;

      case CHASE:
        this.behaviour = CHASE;
        this.speed = CHASESPEED;
        this.targetPos = this.pacPos;
        break;

      case SCATTER:
        this.behaviour = SCATTER;
        this.speed = SCATTERSPEED;
        this.gridPos.x == this.scatterPos.x &&
        this.gridPos.y == this.scatterPos.y
          ? (this.targetPos = { x: 9, y: 9 })
          : (this.targetPos = this.scatterPos);
        break;

      case EATEN:
        //Se till att spöket är i mitten av rutan
        this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
        this.targetPos = { x: 9, y: 9 };
        this.speed = EATENSPEED;
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
    //Ser till så att den nya positionen är en väg
    do {
      xPos = floor(random(1, 19));
      yPos = floor(random(1, 21));
    } while (this.maze.map[yPos][xPos].type != PATH);
    return { x: xPos, y: yPos };
  }
}