class Node {
  constructor(x, y, type) {
    this.position = { x: x, y: y };
    this.type = type;
    this.neighbours = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.camefrom = null;
  }

  /**
   * Rita ut rutan på canvas
   */
  show() {
    switch (this.type) {
      case WALL:
        fill(0, 0, 255);
        rect(this.position.x * SCL, this.position.y * SCL, SCL);
        break;

      case GATE:
        fill(255);
        rect(this.position.x * SCL, this.position.y * SCL + 10, SCL, SCL / 3);
        break;
    }
  }

  /**
   * Hämta nodens grannar
   *
   * @param {array} map Kartan över spelplanen
   */
  update_neighbours(map) {
    if (
      this.position.y < ROWS - 1 &&
      map[this.position.y + 1][this.position.x].type != WALL
    )
      this.neighbours.push(map[this.position.y + 1][this.position.x]); //Ner
    if (
      this.position.y > 0 &&
      map[this.position.y - 1][this.position.x].type != WALL
    )
      this.neighbours.push(map[this.position.y - 1][this.position.x]); //Upp
    if (
      this.position.x < COLS - 1 &&
      map[this.position.y][this.position.x + 1].type != WALL
    )
      this.neighbours.push(map[this.position.y][this.position.x + 1]); //Höger
    if (
      this.position.x > 0 &&
      map[this.position.y][this.position.x - 1].type != WALL
    )
      this.neighbours.push(map[this.position.y][this.position.x - 1]); //Vänster
  }
}
