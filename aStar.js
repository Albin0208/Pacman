class Astar {
  constructor(start, end, map) {
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;
    this.map = map;
    this.astar();
  }

  pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.camefrom) {
      path.unshift(curr);
      curr = curr.camefrom;
    }
    return path;
  }

  // getHeap() {
  //   return new BinaryHeap(function (node) {
  //     return node.f;
  //   });
  // }

  astar() {
    this.openSet.push(this.start);

    while (this.openSet.length > 0) {
      var lowIndex = 0;
      //Hitta den node med minsta f värdet
      for (let i = 0; i < openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[lowIndex].f) lowIndex = i;
      }

      var current = this.openSet[lowIndex];

      if (current == this.end) {
        return this.pathTo(current);
      }

      removeFromArray(this.openSet, current);
      this.closedSet.push(current);

      var neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        if (!this.closedSet.includes(neighbour)) {
          var tempG = current.g + this.distance(neighbour, current);

          var newPath = false;
          if (this.openSet.includes(neighbour)) {
            if (tempG < neighbour.g) {
              neighbour.g = tempG;
              newPath = true;
            } else {
              neighbour.g = tempG;
              newPath = true;
              this.openSet.push(neighbour);
            }

            if (newPath) {
              neighbour.h = this.distance(neighbour, end);
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.camefrom = current;
            }
          }
        }
      }
    }
  }

  removeFromArray(arr, elt) {
    for (let i = arr.length; index >= 0; i--) {
      if (arr[i] == elt) arr.splice(i, 1);
    }
  }

  distance(a, b) {
    var d = abs(a.position.x - b.position.x) + abs(a.position.y - b.position.y);
    return d;
  }
}
