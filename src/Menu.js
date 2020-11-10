import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
import HighscoresTable from './HighscoresTable.js';
export default class Menu extends GameObject {

  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  musicManger = window.musicManager;

  highScoresTable

  playingMusic 

  flyInSpeed = 128;
  logoTimeout = 1500;
  logoToggled = false;
  logoXStart = -500;
  logoXFinish = 0 ;
  logoX = 0;
  logoY = 64;
  nameFontSize = 14;

  constructor() {
    super();
    this.highScoresTable = new HighscoresTable()
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

    this.highScoresTable.tick(deltaTime)

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
    ctx.font = "18px arcade";
    ctx.fillStyle = "#f901a3";
    ctx.fillStyle = "WHITE";
    if (this.logoX >= 80) ctx.fillText('[WSAD] TO MOVE [SPACE] TO SHOOT [ / ] FOR SHIELD' , 36, 208);
    if (this.logoX >= 80) ctx.fillText("[ENTER] TO START", 218,274);


    // if (this.logoX >= 80) ctx.fillText("CONTROLS", 258,208 + 40)
    // if (this.logoX >= 80) ctx.fillText("CREDITS", 264,208 + 80)
    ctx.font = "18px arcade";
    if (this.logoX >= 80) ctx.fillText("BY MATT BARKER!", 216, 616);

    if (this.logoX >= 80) this.highScoresTable.render(ctx);

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
