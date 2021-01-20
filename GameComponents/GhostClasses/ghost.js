/**
 * Klass för gemensamma spökesfunktioner
 */
class Ghost extends PlayerObject {
  constructor(pacman, ghostProperties, maze) {
    super(ghostProperties.startPos, CHASESPEED, ghostProperties.color, maze);
    this.pacman = pacman;
    this.targetPos;
    this.behaviour = SCATTER;
    this.pathSearch = new Astar(R.clone(this.maze.map)); //R.clone skapar en klon av mappen över spelplanen
    this.bestPath;
    this.previousBehaviour = this.behaviour;
    this.scatterPos = ghostProperties.scatterPos;
    this.stayHome = false;
    this.defaultColor = ghostProperties.color;
    this.setBehaviour = new GhostBehaviour(this);
    this.shouldChase = false;
    this.timerOn = false;
  }

  /**
   * Uppdatera spöket
   */
  update() {
    //Timer för att gå mellan scatter och chase
    if (!this.timerOn) {
      //Scatter i 7 sekunder, Chase i 20 sekunder
      this.shouldChase ? this.timerStart(20) : this.timerStart(7);
      this.timerOn = true;
    }

    if (this.stayHome) return;

    if (this.behaviour != EATEN) {
      if (this.maze.megaEaten) {
        this.setBehaviour.setScared();
        this.timer.pauseTimer();
      } else if (this.shouldChase) {
        this.setBehaviour.setChase();
        this.timer.continue();
      } else this.setBehaviour.setScatter();
      if (this.checkPacmanCollision()) {
        this.maze.megaEaten ? this.setBehaviour.setEaten() : this.gameOver();
      }
      this.checkPreviousBehaviour();
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
      this.pacman.gridPos.x * SCL,
      this.pacman.gridPos.y * SCL,
      this.pixPos.x,
      this.pixPos.y
    );
    return d < this.r * 2;
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
      this.maze.map[this.gridPos.y][this.gridPos.x].type == GHOSTHOME
    ) {
      this.pixPos = { x: this.gridPos.x * SCL, y: this.gridPos.y * SCL };
      this.stayHome = true;
      //Starta en timer på 4 sekunder
      this.timer.start(4, () => {
        this.stayHome = false;
        this.setBehaviour.setChase();
        this.direction = { x: 0, y: 0 };
      });
    }
  }

  /**
   * Starta timer för att gå mellan scatter och chase
   * @param {Integer} time antal sekunder som timern ska räkna ner från
   */
  timerStart(time) {
    this.timer.start(time, () => {
      this.shouldChase = !this.shouldChase;
      this.timerOn = false;
    });
  }
}
