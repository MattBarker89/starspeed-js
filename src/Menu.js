import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class Menu extends GameObject {

  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  musicManger = window.musicManager;

  playingMusic 

  flyInSpeed = 128;
  logoTimeout = 1500;
  logoToggled = false;
  logoXStart = -500;
  logoXFinish = 0 ;
  logoX = 0;
  logoY= 64;
  nameFontSize = 14;

  constructor() {
    super();
    this.logoX = this.logoXStart;
    this.startX = this.startXStart;
    this.highScoresX  = this.highScoresXStart;
    this.optionsX = this.optionsXStart;
    this.creditsX = this.creditsXStart;
    this.playingMusic = false;
    this.toggleLogo();
  }

  toggleLogo(){
    setTimeout( () => { this.logoToggled = true }, this.logoTimeout )
  }

  startMusicIfNotPlaying = () => {
    if (this.playingMusic) return;
    this.musicManger.playMenuMusic()
    this.playingMusic = true;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.startMusicIfNotPlaying();

    if (this.logoToggled && this.logoX < 80 ) this.logoX += this.flyInSpeed;
    if (this.logoX >= 80 ) {
      this.logoX = 80;
    }

    if (this.startToggled && this.startX > -100 ) this.startX -= this.flyInSpeed;
    if (this.startX <= -100 ) this.highScoreToggled = true; 

    if (this.highScoreToggled && this.highScoresX < -100 ) this.highScoresX += this.flyInSpeed;
    if (this.highScoresX >= -100 ) this.optionsToggled = true;
    
    if (this.optionsToggled && this.optionsX > -100 ) this.optionsX -= this.flyInSpeed;
    if (this.optionsX <= -100 ) this.creditsToggled = true;
    if (this.creditsToggled && this.creditsX < -100 ) this.creditsX += this.flyInSpeed;
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.drawImage(this.resourceManager.get('./logo.png'), this.logoX, this.logoY);
    ctx.font = "24px retrobound";
    ctx.fillStyle = "#f901a3";

    //ctx.fillText("Start", this.startX + SCREEN.size.width / 2 - 64, this.startY );
    // ctx.fillText("High Scores", this.highScoresX + SCREEN.size.width / 2 - 64, this.highScoresY );
    // ctx.fillText("Options", this.optionsX  + SCREEN.size.width / 2 - 64, this.optionsY );
    // ctx.fillText("Credits", this.creditsX + SCREEN.size.width / 2 - 64, this.creditsY );
    if (this.logoX >= 80) ctx.fillText("START", 278,300)
    ctx.fillStyle = "WHITE";
    if (this.logoX >= 80) ctx.fillText("OPTIONS", 264,350)
    if (this.logoX >= 80) ctx.fillText("CREDITS", 264,400)
    ctx.font = "18px retrobound";
    if (this.logoX >= 80) ctx.fillText("BY MATT BARKER!", 242, 600);

    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.menu
      )
  }

}
