class Node {
  constructor(x, y, type) {
    this.position = { x: x, y: y };
    this.type = type;
    this.neighbours = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }

  /**
   * Rita ut rutan på canvas
   */
  show() {
    switch (this.type) {
      case "wall":
        fill(0, 0, 255);
        rect(this.position.x * scl, this.position.y * scl, scl);
        break;

      case "gate":
        fill(255);
        rect(this.position.x * scl, this.position.y * scl + 10, scl, scl / 3);
        break;

      default:
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
      this.position.y < rows - 1 &&
      map[this.position.y + 1][this.position.x].type != "wall"
    )
      this.neighbours.push(map[this.position.y + 1][this.position.x]); //Down
    if (
      this.position.y > 0 &&
      map[this.position.y - 1][this.position.x].type != "wall"
    )
      this.neighbours.push(map[this.position.y - 1][this.position.x]); //Up
    if (
      this.position.x < cols - 1 &&
      map[this.position.y][this.position.x + 1].type != "wall"
    )
      this.neighbours.push(map[this.position.y][this.position.x + 1]); //Right
    if (
      this.position.x > 0 &&
      map[this.position.y][this.position.x - 1].type != "wall"
    )
      this.neighbours.push(map[this.position.y][this.position.x - 1]); //Left
  }
}
