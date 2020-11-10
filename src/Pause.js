import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class Pause extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  inputManager = window.inputManager;
  musicManager = window.musicManager;

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
        this.musicManager.pauseGameMusic();
      } else if (this.stateManager.systemState === STATES.system.pause) {
        this.stateManager.systemState = STATES.system.game
        this.isPaused = false;
        this.soundManager.playUnpause()
        this.musicManager.unPauseGameMusic();
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
    ctx.font = "32px arcade";
    ctx.fillStyle = "WHITE";
    ctx.fillText("GAME PAUSED", 232 - 40,200)
    ctx.font = "24px arcade";
    ctx.fillText("[ESC] TO RESUME", 232 -30 ,310)
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
