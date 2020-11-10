import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class HighscoresTable extends GameObject {

  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  musicManger = window.musicManager;

  size = {
    width: 512,
    height: 256,
  }

  constructor() {
    super();
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.strokeStyle = "#f901a3";
    //ctx.rect(64, 320, this.size.width, this.size.height);
    ctx.font = "16px arcade";
    ctx.fillStyle = "#36bbf5";
    ctx.fillText("HIGH SCORES", 248,360)
    ctx.font = "16px arcade";
    
    this.stateManager.currentHighScores.forEach((score, index) => {
      const len = score.score.toString().length
      ctx.fillText(`${index +1 }: ${score.name.toUpperCase()}: ${score.score}`, 264 - 2 * len, 360 + 42 + 42 * index)
    });

    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.menu &&
      this.stateManager.currentHighScores.length
      )
  }

}
