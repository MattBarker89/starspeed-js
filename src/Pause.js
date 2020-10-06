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
    ctx.font = "30px arcade";
    ctx.fillStyle = "WHITE";
    ctx.fillText("Game Paused", 210,200)
    ctx.font = "20px arcade";
    ctx.fillText("Quit To Menu", 210,300)
    ctx.fillText("Resume", 210,350)
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState !== STATES.system.menu
      )
  }

}
