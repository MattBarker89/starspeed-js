import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class GameOver extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  inputManager = window.inputManager;

  selectedOption = 0;
  quitColor = "WHITE";
  saveHighScoreColor = "WHITE";

  constructor() {
    super();
    this.updateSelectedOption()
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkSelectionChange();
    this.checkActivate();
  }

  
  checkActivate = () => {
    if(this.inputManager.keyDowns.enter && !this.inputManager.acknowledged.enter) {
      this.inputManager.acknowledged.enter = true;
      this.soundManager.playMenuActivate();
    }
  }


  checkSelectionChange = () => {
    if (this.inputManager.keyDowns.down && !this.inputManager.acknowledged.down) {
      this.inputManager.acknowledged.down = true;
      this.increaseSelectedOption();
    }else if (this.inputManager.keyDowns.up && !this.inputManager.acknowledged.up) {
      this.inputManager.acknowledged.up = true;
      this.decreaseSelectedOption();
    } 
  }

  updateSelectedOption = () => {
    if (this.selectedOption === 0) {
      this.quitColor = "#f901a3"
      this.saveHighScoreColor = "WHITE"
    } else if (this.selectedOption === 1) {
      this.quitColor = "WHITE"
      this.saveHighScoreColor = "#f901a3"
    }  
  }

  increaseSelectedOption = () => {
    if (this.selectedOption === 0) {
      this.selectedOption = 1
      this.updateSelectedOption();
    } else if (this.selectedOption === 1) {
      this.selectedOption = 0;
      this.updateSelectedOption();
    } 
  }

  decreaseSelectedOption = () => {
    if (this.selectedOption === 0) {
      this.selectedOption = 1
      this.updateSelectedOption();
    } else if (this.selectedOption === 1) {
      this.selectedOption = 0;
      this.updateSelectedOption();
    }
 
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.fillRect(0, 0, SCREEN.size.width, SCREEN.size.height);

    ctx.font = "32px retrobound";
    ctx.fillStyle = "WHITE";
    ctx.fillText("GAME OVER", 242,200)
    ctx.fillStyle = this.quitColor;
    ctx.font = "24px retrobound";
    ctx.fillText("QUIT", 286,310)
    ctx.fillStyle = this.saveHighScoreColor;
    ctx.fillText("SAVE HIGHSCORE", 225,360)
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState == STATES.system.game && 
      this.stateManager.gameState === STATES.game.gameOver
      )
  }

}
