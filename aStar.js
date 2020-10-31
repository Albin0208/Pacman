class Astar {
  constructor(start, end, map) {
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;
    this.map = map;
    this.init();
    this.run();
  }

  init() {
    this.openSet.push(this.start);
  }

  run() {
    while (this.openSet.length > 0) {
      var winner = 0;

      for (let i = 0; i < openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) winner = i;
      }

      var current = this.openSet[winner];

      if (current == this.end) console.log("done");

      removeFromArray(this.openSet, current);
      this.closedSet.push(current);
    }
  }

  removeFromArray(arr, elt) {
    for (let i = arr.length; index >= 0; i--) {
      if (arr[i] == elt) arr.splice(i, 1);
    }
  }
}
