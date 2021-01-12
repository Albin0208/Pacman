/**
 * Timer klass
 */
class Timer {
  constructor() {
    this.timer;
    this.pause = false;
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
      if (!this.pause) {
        countDownTime--;
        console.log(countDownTime);
        if (countDownTime <= 0) {
          func();
          this.reset();
        }
      }
    }, 1000);
  }

  /**
   * Stäng av timern
   */
  reset() {
    clearInterval(this.timer);
  }

  /**
   * Pausa timern
   */
  pauseTimer() {
    this.pause = true;
  }

  /**
   * Kör igång timer efter paus
   */
  continue() {
    this.pause = false;
  }
}
