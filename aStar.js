class Astar {
  constructor(map) {
    this.map = map;
  }

  pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.camefrom) {
      path.unshift(curr);
      var temp = curr.camefrom;
      curr.camefrom = null;
      curr = temp;
    }
    return path;
  }

  astar(start, end) {
    var openSet = [];
    var closedSet = [];
    openSet.push(this.map[start.y][start.x]);

    while (openSet.length > 0) {
      var lowIndex = 0;
      //Hitta den node med minsta f värdet
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowIndex].f) lowIndex = i;
      }

      var current = openSet[lowIndex];

      if (current.position.x == end.x && current.position.y == end.y) {
        return this.pathTo(current);
      }

      this.removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        if (!closedSet.includes(neighbour)) {
          var gScore = current.g + 1;
          var gScoreIsBest = false;
          if (!openSet.includes(neighbour)) {
            gScoreIsBest = true;
            neighbour.h = this.manhattanDistance(neighbour.position, end);
            openSet.push(neighbour);
          } else if (gScore < neighbour.g) {
            gScoreIsBest = true;
          }

          if (gScoreIsBest) {
            neighbour.camefrom = current;
            neighbour.g = gScore;
            neighbour.f = neighbour.g + neighbour.h;
          }
        }
      }
    }
    console.log("Fel");
  }

  removeFromArray(arr, elt) {
    for (let i = arr.length; i >= 0; i--) {
      if (arr[i] == elt) arr.splice(i, 1);
    }
  }

  manhattanDistance(a, b) {
    var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
  }
}
