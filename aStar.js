class Astar {
  constructor(start, end, map) {
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;
    this.map = map;
    // console.log(this.map);
    // this.astar();
  }

  pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.camefrom) {
      path.unshift(curr);
      curr = curr.camefrom;
    }
    // console.log(path);
    return path;
  }

  astar() {
    this.openSet.push(this.map[this.start.x][this.start.y]);

    // console.log(this.openSet);
    while (this.openSet.length > 0) {
      var lowIndex = 0;
      //Hitta den node med minsta f värdet
      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[lowIndex].f) lowIndex = i;
      }

      // console.log(this.openSet[lowIndex]);
      var current = this.openSet[lowIndex];

      // console.log(current.position, this.end);
      if (
        current.position.x == this.end.x &&
        current.position.y == this.end.y
      ) {
        console.log("Best path found");
        return this.pathTo(current);
      }

      // console.log(this.openSet, current);
      this.removeFromArray(this.openSet, current);
      this.closedSet.push(current);

      var neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        if (!this.closedSet.includes(neighbour)) {
          var gScore = current.g + 1;
          var gScoreIsBest = false;
          // console.log(neighbour);
          if (!this.openSet.includes(neighbour)) {
            gScoreIsBest = true;
            neighbour.h = this.manhattanDistance(neighbour.position, this.end);
            this.openSet.push(neighbour);
          } else if (gScore < neighbour.g) {
            gScoreIsBest = true;
          }

          if (gScoreIsBest) {
            neighbour.camefrom = current;
            neighbour.g = gScore;
            neighbour.f = neighbour.g + neighbour.h;
            // console.log(
            //   "F: " + neighbour.f + " G: " + neighbour.g + " H: " + neighbour.h
            // );
          }
        }

        // if (!this.closedSet.includes(neighbour)) {
        //   var tempG = current.g + this.manhattanDistance(neighbour, current);

        //   var newPath = false;
        //   if (this.openSet.includes(neighbour)) {
        //     if (tempG < neighbour.g) {
        //       neighbour.g = tempG;
        //       newPath = true;
        //     } else {
        //       neighbour.g = tempG;
        //       newPath = true;
        //       this.openSet.push(neighbour);
        //     }

        //     if (newPath) {
        //       neighbour.h = this.manhattanDistance(neighbour, end);
        //       neighbour.f = neighbour.g + neighbour.h;
        //       neighbour.camefrom = current;
        //     }
        // }
        // }
      }
    }
  }

  removeFromArray(arr, elt) {
    // console.log(elt);
    for (let i = arr.length; i >= 0; i--) {
      if (arr[i] == elt) arr.splice(i, 1);
    }
  }

  manhattanDistance(a, b) {
    var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
  }
}
