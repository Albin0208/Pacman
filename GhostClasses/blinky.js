class Blinky extends Ghost {
  constructor(pacpos, maze) {
    super(pacpos, BLINKYSCATTERPOS, BLINKYSTARTPOS, "red", pacpos, maze);
  }
}
