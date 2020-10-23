class Food {
  constructor(x, y) {
    this.position = { x: x, y: y };
    this.strokeWeight = (1 / 5) * scl;
    this.type = "normal";
  }

  mega() {
    this.strokeWeight = (1 / 2) * scl;
    this.type = "mega";
  }

  show() {
    push();
    strokeWeight(this.strokeWeight);
    stroke("white");
    point(this.position.x * scl + scl / 2, this.position.y * scl + scl / 2);
    pop();
  }
}
