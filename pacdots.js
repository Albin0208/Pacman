class PacDot {
  constructor(position, x, y) {
    this.position = position;
    // this.position = { x: x, y: y };
    this.strokeWeight = (1 / 5) * scl;
    this.type = "normal";
  }

  /**
   * Gör den specifika pacdoten till en mega pacdot
   */
  mega() {
    this.strokeWeight = (1 / 2) * scl;
    this.type = "mega";
  }

  /**
   * Rita ut pacdoten
   */
  show() {
    push();
    strokeWeight(this.strokeWeight);
    stroke("white");
    point(this.position.x * scl + scl / 2, this.position.y * scl + scl / 2);
    pop();
  }
}
