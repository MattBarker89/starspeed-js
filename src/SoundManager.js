
export default class SoundManager {

  soundEnabled;

  constructor(){
    this.soundEnabled = true;
  }

  hit = new Audio("./hit.wav");
  die = new Audio("./die.wav");
  enemyShoot = new Audio("./enemy-shoot.wav")
  playerDie = new Audio("./player-die.wav");


  playShoot = () => {
    if (!this.soundEnabled) return;
    new Audio("./shoot.wav").play();
  }

  playHit = () => {
    if (!this.soundEnabled) return;
    this.hit.play();
  }

  playDie = () => {
    if (!this.soundEnabled) return;
    this.die.play();
  }

  playPlayerDie = () => {
    if (!this.soundEnabled) return;
    this.playerDie.play();
  }

  playEnemyShoot = () => {
    if (!this.soundEnabled) return;
    this.enemyShoot.play();
  }    
}




