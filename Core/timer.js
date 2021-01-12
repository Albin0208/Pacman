/**
 * Timer klass
 */
class Timer {
  constructor() {
    this.timer;
  }

  /**
   * Starta timern
   *
   * @param {number} countDownTime Hur många sekunder timer ska vara
   * @param {function} func En funktion som ska anropas när tiden är slut
   */
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

  /**
   * Stäng av timern
   */
  reset() {
    clearInterval(this.timer);
  }
}
