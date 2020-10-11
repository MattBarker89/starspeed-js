import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class GameOver extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  inputManager = window.inputManager;

  constructor() {
    super();
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.fillRect(0, 0, SCREEN.size.width, SCREEN.size.height);
    ctx.font = "30px arcade";
    ctx.fillStyle = "WHITE";
    ctx.fillText("Game Over", 210,200)
    ctx.font = "20px arcade";
    ctx.fillText("Quit To Menu", 210,300)
    ctx.fillText("Save HighScore?", 210,350)
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
