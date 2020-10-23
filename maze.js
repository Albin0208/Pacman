class Maze {
  constructor() {
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [5, 5, 5, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 5, 5, 5],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [5, 5, 5, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 5, 5, 5],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 4, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 4, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.food = [];
  }

  show() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length + 1; j++) {
        if (this.grid[i][j] == 0) {
          fill(0, 0, 255);
          rect(j * scl, i * scl, scl);
        }
        if (this.grid[i][j] == 3) {
          fill(255);
          rect(j * scl, i * scl + 10, scl, scl / 3);
        }
        // noFill();
        // noStroke();
        // stroke(255);
        // rect(j * scl, i * scl, scl);
      }
    }

    this.food.forEach((food) => {
      food.show();
    });
  }

  initializeFood() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == 1) this.food.push(new Food(j, i));
        if (this.grid[i][j] == 4) {
          this.food.push(new Food(j, i));
          this.food[this.food.length - 1].mega();
        }
      }
    }
  }

  /**
   * Kollar om pacman är i kontakt med mat,
   * om så är fallet ta bort maten ur arrayen
   *
   * @param {object} gridPos Pacmans position
   * @returns {bool} Om pacman har ätit mat
   */
  eatFood(gridPos) {
    for (let i = 0; i < this.food.length; i++) {
      if (
        this.food[i].position.x == gridPos.x &&
        this.food[i].position.y == gridPos.y
      ) {
        // console.log(this.food[i].position.x, this.food[i].position.y);
        this.food.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
