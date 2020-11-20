class PacDot {
  constructor(position) {
    this.position = position;
    this.strokeWeight = (1 / 5) * SCL;
    this.type = NORMAL;
  }

  /**
   * Gör den specifika pacdoten till en powerpill pacdot
   */
  powerPill() {
    this.strokeWeight = (1 / 2) * SCL;
    this.type = POWERPILL;
  }

  /**
   * Rita ut pacdoten
   */
  show() {
    push();
    strokeWeight(this.strokeWeight);
    stroke("white");
    point(this.position.x * SCL + SCL / 2, this.position.y * SCL + SCL / 2);
    pop();
  }
}
