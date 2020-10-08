export default class Store {

  currentScore
  shotsFired
  shotsHit
  accuracy

  constructor() {
    this.currentScore = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.accuracy = 100;
  }

  calculateAccuracy = () => {
    this.accuracy = Math.round(this.shotsHit / this.shotsFired   * 100);
  }

  increaseCurrentScore = (ammount) => {
    this.currentScore += ammount;
  }

  increaseShotsFired = () => {
    this.shotsFired++;
    this.calculateAccuracy();     
  }

  increaseShotsHit = () => {
    this.shotsHit++;
    this.calculateAccuracy();
  }
  
}
