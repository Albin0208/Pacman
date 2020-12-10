class Ghost extends PlayerObject {
  constructor(pacPos, scatterPos, startPos, color, targetPos, maze) {
    super(startPos, CHASESPEED, color, maze, map);
    this.pacPos = pacPos;
    this.targetControll = targetPos;
    this.targetPos;
    this.setTarget();
    this.behaviour = SCATTER;
    this.pathSearch = new Astar(R.clone(this.maze.map)); //R.clone skapar en klon av mappen över spelplanen
    this.bestPath;
    this.previousBehaviour = this.behaviour;
    this.scatterPos = scatterPos;
    this.stayHome = false;
  }

  /**
   * Uppdatera spökets info
   */
  update() {
    if (this.stayHome) return;

    this.setBehaviour(SCATTER);
    if (this.behaviour != EATEN && 1 == 2) {
      if (this.maze.megaEaten) {
        this.setBehaviour(SCARED);
      } else {
        this.setBehaviour(CHASE);
      }
      if (this.checkPacmanCollision()) {
        //TODO Fixa gameover screen
        this.maze.megaEaten ? this.setBehaviour(EATEN) : gameOver();
      }
    }
    if (this.ableToMove) this.move();

    if (this.timeToMove()) {
      this.setPath();
      this.setDir();
      this.ableToMove = this.checkWallCollision(this.gridPos, this.direction);
    }
    this.setGridPos();
    this.returnedHome();
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
    //TODO Fixa så att a* returnerar en targetposition istället för en array
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
    return d < this.r * 2;
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
        //Invertera spöket riktning
        if (this.behaviour != SCARED) {
          this.direction.x = -this.direction.x;
          this.direction.y = -this.direction.y;
        }
        this.behaviour = SCARED;
        break;

      case CHASE:
        // this.targetPos = this.pacPos;
        this.setTarget();
        this.behaviour = CHASE;
        this.speed = CHASESPEED;
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
        this.targetPos = { x: 9, y: 9 };
        this.speed = EATENSPEED;
        this.behaviour = EATEN;
        this.direction = { x: 0, y: 0 };
        break;
    }
    this.checkPreviousBehaviour();
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
    } while (this.map[yPos][xPos].type != PATH);
    return { x: xPos, y: yPos };
  }

  /**
   * Kolla föregående beteende
   */
  checkPreviousBehaviour() {
    //Om det är ett nytt beteende
    if (this.previousBehaviour != this.behaviour) {
      //Se till att spöket är i mitten av rutan
      this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
    }
    this.previousBehaviour = this.behaviour;
  }

  /**
   * Kolla om spöket har kommit hem
   */
  returnedHome() {
    if (
      this.behaviour == EATEN &&
      this.map[this.gridPos.y][this.gridPos.x].type == GHOSTHOME
    ) {
      this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
      this.stayHome = true;
      //Starta en timer på 4 sekunder
      this.timer.start(4, () => {
        this.stayHome = false;
        this.setBehaviour(CHASE);
        this.direction = { x: 0, y: 0 };
      });
    }
  }

  setTarget() {
    this.targetPos = this.targetControll;
  }
}
