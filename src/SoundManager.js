
export default class SoundManager {

  soundEnabled;

  constructor(){
    this.soundEnabled = true;
  }

  hit = new Audio("./hit.wav");
  die = new Audio("./die.wav");
  enemyShoot = new Audio("./enemy-shoot.wav");
  playerDie = new Audio("./player-die.wav");
  pause = new Audio("./pause.wav");
  unpause = new Audio("./unpause.wav");

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

  playPause = () => {
    if (!this.soundEnabled) return;
    this.pause.play();
  }

  playUnpause = () => {
    if (!this.soundEnabled) return;
    this.unpause.play();
  }


  playEnemyShoot = () => {
    if (!this.soundEnabled) return;
    this.enemyShoot.play();
  }    
}




