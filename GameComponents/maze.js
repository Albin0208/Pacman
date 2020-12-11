class Maze {
  constructor(gameOver) {
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
      [1, 1, 1, 1, 1, 1, 1, 0, 6, 6, 6, 0, 1, 1, 1, 1, 1, 1, 1],
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
    this.pacdots = [];
    this.map = [];
    this.megaEaten = false;
    this.gameOver = gameOver;
  }

  /**
   * Rita ut mazen
   */
  show() {
    this.map.forEach((row) => {
      row.forEach((node) => {
        node.show();
      });
    });
    //Iterera över alla pacdots och rita ut dem
    this.pacdots.forEach((pacdot) => {
      pacdot.show();
    });
  }

  /**
   * Kollar om pacman är i kontakt med en pacdot,
   * om så är fallet ta bort pacdoten ur arrayen
   *
   * @param {object} gridPos Pacmans position
   * @returns {boolean} Om pacman har ätit en pacdot
   */
  checkPacdot(gridPos) {
    for (let i = 0; i < this.pacdots.length; i++) {
      if (
        this.pacdots[i].position.x == gridPos.x &&
        this.pacdots[i].position.y == gridPos.y
      ) {
        var type = this.pacdots[i].type;

        // Ta bort maten från arrayen
        this.pacdots.splice(i, 1);
        return type;
      }
    }
    return false;
  }

  //#region Initialize Game methods

  /**
   * Förbered spelet
   */
  initGame() {
    for (var i = 0; i < this.grid.length; i++) {
      this.map[i] = [];
      for (var j = 0; j < this.grid[i].length + 1; j++) {
        switch (this.grid[i][j]) {
          case 0:
            this.map[i].push(new Node(j, i, WALL));
            break;

          case 1:
            this.map[i].push(new Node(j, i, PATH));
            break;

          case 2:
            this.map[i].push(new Node(j, i, PACMANPOS));
            break;

          case 3:
            this.map[i].push(new Node(j, i, GATE));
            break;

          case 4:
            this.map[i].push(new Node(j, i, POWERPILL));
            break;

          case 5:
            this.map[i].push(new Node(j, i, VOID));
            break;

          case 6:
            this.map[i].push(new Node(j, i, GHOSTHOME));
            break;
        }
      }
    }
    this.map.forEach((row) => {
      row.forEach((node) => {
        node.update_neighbours(this.map);
      });
    });
    this.initializePacdots();
  }

  /**
   * Lägg till all mat i en lista
   */
  initializePacdots() {
    this.map.forEach((row) => {
      row.forEach((node) => {
        if (node.type == PATH || node.type == POWERPILL) {
          this.pacdots.push(new PacDot(node.position));
          if (node.type == POWERPILL) {
            this.pacdots[this.pacdots.length - 1].powerPill();
          }
        }
      });
    });
  }

  //#endregion

  returnGameOver() {
    return this.gameOver;
  }
}
