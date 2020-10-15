class Pacman {
  constructor(maze) {
    this.x = width / 2;
    this.y = 15 + 15 * scl;
    this.direction = {
      x: 0,
      y: 0,
    };
    this.speed = 3;
    this.maze = maze;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 24);
  }

  update() {
    // this.wallcollision(this.direction.x, this.direction.y);
    this.handleMovement(this.direction.x, this.direction.y);
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
  }

  handleMovement(xdir, ydir) {
    /*TODO
      Kolla om nästa steg resulterar i krock med vägg.
      Om man rör sig i x-led och vill byta till y-led,
      men y-led leder till krock med vägg = fortsätt i
      samma x-led riktning.

      TODO
      Man kan kolla spara en gamla positionen och kolla om den kan flytta till den nya positionen 30px bort,
      om inte behåll den gamla positionen, annars flytta spelaren med this.speed till spelaren är på den nya
      positionen och upprepa samma koll för nästa flytt
    */
    if (xdir != 0) {
      if (this.wallcollision(xdir, ydir)) {
        this.setdir(0, this.direction.y);
      } else {
        this.setdir(xdir, ydir);
      }
    } else if (ydir != 0) {
      if (this.wallcollision(xdir, ydir)) {
        this.setdir(this.direction.x, 0);
      } else {
        this.setdir(xdir, ydir);
      }
    }
  }

  test(xdir, ydir) {
    if (this.wallcollision(xdir, ydir)) {
      if (this.direction.x != 0) {
        this.setdir(this.direction.x, 0);
      } else if (this.direction.y != 0) {
        this.setdir(0, this.direction.y);
      } else {
        this.setdir(0, 0);
      }
      this.setdir(0, 0);
    } else {
      this.setdir(xdir, ydir);
    }
  }

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

  wallcollision(x, y) {
    var newX = this.x + x * this.speed;
    var newY = this.y + y * this.speed;

    if (x > 0 || y > 0) {
      newX += 12;
      newY += 12;
    } else if (x < 0 || y < 0) {
      newX -= 13;
      newY -= 13;
    }

    if (this.contains(newX, newY)) {
      // this.setdir(0, 0);
      return true;
    }
    return false;
  }
}
