class Inky extends Ghost {
  constructor(pacman, maze, blinky) {
    super(pacman, INKYPROPERTIES, maze);
    this.type = "inky";
    this.blinkyPos = blinky.gridPos;
  }

  /**
   * Sätter spökets targetposition
   */
  setTarget() {
    if (this.behaviour != CHASE) return;

    this.targetPos = this.pacman.gridPos;
    let direction = {
      x: this.pacman.direction.x,
      y: this.pacman.direction.y,
    };

    let twoStep = {
      x: this.pacman.gridPos.x + direction.x * 2,
      y: this.pacman.gridPos.y + direction.y * 2,
    };

    let x = abs(this.blinkyPos.x - twoStep.x);
    let y = abs(this.blinkyPos.y - twoStep.y);

    let tempTargetPos = {
      x: twoStep.x + x,
      y: twoStep.y + y,
    };

    let temp = direction.x == 0;
    let dir = 1;

    for (
      let j = 0;
      (tempTargetPos.x < 1 ||
        tempTargetPos.x > 18 ||
        tempTargetPos.y < 1 ||
        tempTargetPos.y > 19 ||
        this.maze.map[tempTargetPos.y][tempTargetPos.x].type == VOID) &&
      j < 2;
      j++
    ) {
      if (temp) {
        direction.x = dir;
        direction.y = 0;
      } else {
        direction.x = 0;
        direction.y = dir;
      }

      dir = -dir;
      tempTargetPos = {
        x: this.targetPos.x + direction.x,
        y: this.targetPos.y + direction.y,
      };
    }

    this.targetPos = { x: tempTargetPos.x, y: tempTargetPos.y };

    push();
    fill(this.defaultColor);
    rect(this.targetPos.x * SCL, this.targetPos.y * SCL, SCL);
    pop();
  }
}
