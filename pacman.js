class Pacman {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.738;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 25);
  }

  wallcollision() {}
}
