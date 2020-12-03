class Timer {
  constructor() {
    this.timer;
  }

  start(countDownTime, func) {
    this.reset();
    this.timer = setInterval(() => {
      countDownTime--;
      console.log(countDownTime);
      if (countDownTime <= 0) {
        func();
        this.reset();
      }
    }, 1000);
  }

  reset() {
    clearInterval(this.timer);
  }
}
