class Pacman {
  constructor(maze) {
    this.position = {
      x: width / 2,
      y: 15 + 15 * scl,
    };
    this.direction = { x: 0, y: 0 };
    this.speed = 3;
    this.maze = maze;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.position.x, this.position.y, 24);
  }

  update() {
    this.handleMovement(this.direction.x, this.direction.y);
  }

  handleMovement(xdir, ydir) {
    /*TODO
      Kolla om nästa steg resulterar i krock med vägg.
      Om man rör sig i x-led och vill byta till y-led,
      men y-led leder till krock med vägg = fortsätt i
      samma x-led riktning.

      TODO
      Man kan kolla spara den gamla positionen och kolla om den kan flytta till den nya positionen 30px bort,
      om inte behåll den gamla positionen, annars flytta spelaren med this.speed till spelaren är på den nya
      positionen och upprepa samma koll för nästa flytt
    */
    var oldPosition = { x: 0, y: 0 };

    oldPosition.x = this.position.x;
    oldPosition.y = this.position.y;

    if (xdir > 0) {
      this.position.x += 30;
      if (this.contains(this.position.x, this.position.y)) {
        this.position = oldPosition;
      } else {
        this.position = oldPosition;
        this.setdir(xdir, ydir);
        // this.move();
        this.position.x += 30;
      }
    } else if (xdir < 0) {
      this.position.x -= 30;
      if (this.contains(this.position.x, this.position.y)) {
        this.position = oldPosition;
      } else {
        this.position = oldPosition;
        this.setdir(xdir, ydir);
        // this.move();
        this.position.x -= 30;
      }
    } else if (ydir > 0) {
      this.position.y += 30;
      if (this.contains(this.position.x, this.position.y)) {
        this.position = oldPosition;
      } else {
        this.position = oldPosition;
        this.setdir(xdir, ydir);
        // this.move();
        this.position.y += 30;
      }
    } else if (ydir < 0) {
      this.position.y -= 30;
      if (this.contains(this.position.x, this.position.y)) {
        this.position = oldPosition;
      } else {
        this.position = oldPosition;
        this.setdir(xdir, ydir);
        // this.move();
        this.position.y -= 30;
      }
    }
  }

  // move() {
  //   this.position.x += this.direction.x * this.speed;
  //   this.position.y += this.direction.y * this.speed;
  // }

  setdir(xdir, ydir) {
    this.direction.x = xdir;
    this.direction.y = ydir;
  }

  contains(x, y) {
    if (this.maze.grid[floor(y / scl)][floor(x / scl)] == 0) {
      console.log("Wall detected");
      return true;
    }
    return false;
  }
}
