
export default class SoundManager {

  soundEnabled;

  constructor(){
    this.soundEnabled = false;
  }

  hit = new Audio("./hit.wav");
  die = new Audio("./die.wav");
  enemyShoot = new Audio("./enemy-shoot.wav");
  playerDie = new Audio("./player-die.wav");
  pause = new Audio("./pause.wav");
  unpause = new Audio("./unpause.wav");
  shieldUp1 = new Audio("./shield-up-1.wav");
  shieldUp2 = new Audio("./shield-up-2.wav");
  shieldUp3 = new Audio("./shield-up-3.wav");
  shieldOff = new Audio("./shield-off.wav");
  shieldHit = new Audio("./shield-hit.wav");

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

  playShieldUp1 = () => {
    if (!this.soundEnabled) return;
    this.shieldUp1.play();
  }
  
  playShieldUp2 = () => {
    if (!this.soundEnabled) return;
    this.shieldUp2.play();
  }
  
  playShieldUp3 = () => {
    if (!this.soundEnabled) return;
    this.shieldUp3.play();
  }

  playShieldOff = () => {
    if (!this.soundEnabled) return;
    this.shieldOff.play();
  }

  playShieldHit = () => {
    if (!this.soundEnabled) return;
    this.shieldHit.play();
  }

}




