class Pacman {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.738;
    this.direction = {
      xdir: 0,
      ydir: 0,
    };
    this.speed = 3;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 25);
  }

  update() {
    this.x += this.direction.xdir * this.speed;
    this.y += this.direction.ydir * this.speed;
  }

  setdir(xdir, ydir) {
    this.direction.xdir = xdir;
    this.direction.ydir = ydir;
  }

  wallcollision() {}
}
