class Pinky extends Ghost {
  constructor(pacman, maze) {
    super(pacman, PINKYPROPERTIES, maze);
    this.type = "pinky";
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

    for (let i = 0; i < 4; i++) {
      let tempTargetPos = {
        x: this.targetPos.x + direction.x,
        y: this.targetPos.y + direction.y,
      };

      let temp = direction.x == 0;
      let dir = 1;
      //Hanterar om pacman åker genom en portal
      if (tempTargetPos.y == 9) {
        if (tempTargetPos.x <= 0) tempTargetPos.x = 18;
        else if (tempTargetPos.x >= 18) tempTargetPos.x = 0;
      }
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
    }
    //Temporär ritning av Clydes targetposition
    push();
    fill(this.defaultColor);
    rect(this.targetPos.x * SCL, this.targetPos.y * SCL, SCL);
    pop();
  }
}
