import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class Pause extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  inputManager = window.inputManager;

  isPaused;

  constructor() {
    super();
    this.isPaused = false;
  }

  checkIsPaused() {
    if(this.inputManager.keyDowns.escape && !this.inputManager.acknowledged.escape) {
      this.inputManager.acknowledged.escape = true;
      if(this.stateManager.systemState === STATES.system.game) {
        this.stateManager.systemState = STATES.system.pause
        this.isPaused = true;
        this.soundManager.playPause()
      } else if (this.stateManager.systemState === STATES.system.pause) {
        this.stateManager.systemState = STATES.system.game
        this.isPaused = false;
        this.soundManager.playUnpause()
      }
    }
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkIsPaused();
  }

  render(ctx) {
    if (!this.correctState()) return;
    if (!this.isPaused) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.fillRect(0, 0, SCREEN.size.width, SCREEN.size.height);
    ctx.font = "32px retrobound";
    ctx.fillStyle = "WHITE";
    ctx.fillText("GAME PAUSED", 232,200)
    ctx.font = "24px retrobound";
    ctx.fillText("RESUME", 280,310)
    ctx.fillText("QUIT", 290,360)
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState !== STATES.system.menu 
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}
