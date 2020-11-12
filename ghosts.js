class Ghosts {
  constructor(targetPos, maze, speed) {
    this.gridPos = { x: 9, y: 9 };
    this.pixPos = { x: this.gridPos.x * scl, y: this.gridPos.y * scl };
    this.direction = { x: 0, y: 0 };
    this.targetPos = targetPos;
    this.mode = "chase";
    this.speed = 2;
    this.color = "red";
    this.r = 12;
    this.maze = maze;
    this.bestPath;
    this.pathSearch = new Astar(this.maze.map);
  }

  show() {
    fill(this.color);
    circle(this.pixPos.x + scl / 2, this.pixPos.y + scl / 2, this.r * 2);

    if (this.bestPath)
      this.bestPath.forEach((node) => {
        circle(
          node.position.x * scl + scl / 2,
          node.position.y * scl + scl / 2,
          6
        );
      });
  }

  update() {
    if (this.targetPos != this.gridPos) {
      this.pixPos.x += this.direction.x * this.speed;
      this.pixPos.y += this.direction.y * this.speed;
    }
    if (this.timeToMove()) {
      this.move();
    }

    //Sätter grid positionen i förhållande till pixel positionen
    this.gridPos.x = floor((this.pixPos.x + scl / 2) / scl);
    this.gridPos.y = floor((this.pixPos.y + scl / 2) / scl);
  }

  move() {
    // this.setRandomDir();
    this.setPath();
    this.setDir();
  }

  setRandomDir() {
    var tempDir = { x: 0, y: 0 };
    while (true) {
      var number = floor(random(-2, 2));
      switch (number) {
        case -2:
          tempDir = { x: 1, y: 0 };
          break;
        case -1:
          tempDir = { x: 0, y: 1 };
          break;
        case 0:
          tempDir = { x: -1, y: 0 };
          break;
        case 1:
          tempDir = { x: 0, y: -1 };
          break;

        default:
          break;
      }
      if (this.maze.checkWallCollision(this.gridPos, tempDir)) {
        this.direction = tempDir;
        break;
      }
    }
  }

  setDir() {
    console.log(this.bestPath[0].position);
    this.direction.x = this.bestPath[0].position.x - this.gridPos.x;
    this.direction.y = this.bestPath[0].position.y - this.gridPos.y;
  }

  setSpeed() {
    if (this.mode == "chase") this.speed = 2;
    else this.speed = 1;
  }

  timeToMove() {
    return (
      (this.pixPos.x % scl == 0 && this.direction.y == 0) ||
      (this.pixPos.y % scl == 0 && this.direction.x == 0)
    );
  }

  setPath() {
    if (this.targetPos) {
      var temp = this.pathSearch.astar(this.gridPos, this.targetPos);
      if (temp != null) this.bestPath = temp;
    }
  }
}
