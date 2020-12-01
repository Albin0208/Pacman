class Timer {
  constructor(countDownTime, maze) {
    this.countDownTime = countDownTime;
    this.maze = maze;
    this.timer;
  }

  start() {
    timer = setInterval(() => {
      this.countDownTime--;
      console.log(this.countDownTime);
      if (this.countDownTime <= 0) {
        this.reset();
        this.maze.megaEaten = false;
      }
    }, 1000);
  }

  reset() {
    clearInterval(timer);
  }
}
