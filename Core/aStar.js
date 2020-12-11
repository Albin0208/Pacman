class Astar {
  constructor(map) {
    this.map = map;
  }

  /**
   * Återskapar den kortaste vägen från slutpunkten
   * till startpunkten
   *
   * @param {Node} En ruta i rutnätet
   * @returns {array} En array med den kortaste vägen
   */
  pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.camefrom) {
      path.unshift(curr);
      var temp = curr.camefrom;
      curr.camefrom = null;
      curr.f = 0;
      curr.g = 0;
      curr = temp;
    }
    return path;
  }

  /**
   * Hittar kortaste vägen från en punkt till en annan
   *
   * @param {object} start startpunkten
   * @param {object} end slutpunkten
   */
  astar(start, end, direction) {
    var openSet = [];
    var closedSet = [];
    openSet.push(this.map[start.y][start.x]);
    //Se till så att spöket bara kan gå i den riktning det färdas i
    closedSet.push(this.map[start.y - direction.y][start.x - direction.x]);

    var first = true;

    while (openSet.length > 0) {
      var lowIndex = 0;
      //Hitta den node med minsta f värdet
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowIndex].f) lowIndex = i;
      }

      var current = openSet[lowIndex];

      //Om positionen är slutpunkten
      if (current.position.x == end.x && current.position.y == end.y) {
        return this.pathTo(current);
      }

      this.removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbours = current.neighbours;
      //Gå igenom nodes grannar
      for (let i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        //Om vi inte besökt den noden tidigare och den inte är en vägg
        if (!closedSet.includes(neighbour) && neighbour.type != WALL) {
          var gScore = current.g + 1;
          var hScore = 0;
          var gScoreIsBest = false;
          if (!openSet.includes(neighbour)) {
            gScoreIsBest = true;
            hScore = this.manhattanDistance(neighbour.position, end);
            openSet.push(neighbour);
          } else if (gScore < neighbour.g) {
            gScoreIsBest = true;
          }

          //Bästa g poängen hittad
          if (gScoreIsBest) {
            neighbour.camefrom = current;
            neighbour.g = gScore;
            neighbour.f = neighbour.g + hScore;
          }
        }
      }

      /*Första loopen ta bort första värdet i,
       *listan med besökta noders
       */
      if (first) {
        closedSet.shift();
        first = false;
      }
    }
    //Kommer vi hit så har ingen väg hittats
    console.log("Ingen väg hittad");
  }

  /**
   * Gå igenom en array baklänges och ta bort ett objekt som är sökt efter
   *
   * @param {array} arr arrayen som ska sökas igenom
   * @param {object} elt objektet som ska tas bort från arrayen
   */
  removeFromArray(arr, elt) {
    for (let i = arr.length; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Räkna ut distansen mellan två punkter
   *
   * @param {object} a startpunkt
   * @param {object} b slutpunkt
   * @returns {number} Distansen mellan två punkter
   */
  manhattanDistance(a, b) {
    var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
  }
}
