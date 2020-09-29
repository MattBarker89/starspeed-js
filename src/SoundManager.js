
export default class SoundManager {


  shoot = new Audio("./shoot.wav");
  hit = new Audio("./hit.wav");
  die = new Audio("./die.wav");


  playShoot = () => {
    new Audio("./shoot.wav").play();
  }

  playHit = () => {
    this.hit.play();
  }


  playDie = () => {
    this.die.play();
  }



}




