import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'

export default class ShieldIndicator extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager

  isPoweredUp
  maxLevel = 112
  currentLevel
  speed = 6;

  constructor() {
    super();
    this.isPoweredUp = true;
    this.currentLevel = 0;
  }

  countDownPowerUp = () => {
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    if (!this.isPoweredUp) return;

    if( this.currentLevel <= this.maxLevel -1) {

      this.currentLevel += this.speed
    } else {
      this.currentLevel = this.maxLevel;
    }
  } 

  render(ctx) {
    if (!this.correctState()) return;


    ctx.beginPath();
    ctx.lineWidth = 3
    ctx.shadowBlur=10
    ctx.shadowColor="WHITE";
    ctx.strokeStyle = "WHITE";
    ctx.strokeRect(32,SCREEN.size.height - this.maxLevel - 32, 8, this.maxLevel)
    ctx.stroke();
    ctx.fillStyle = "#36bbf5" 
    ctx.fillRect(32,SCREEN.size.height -  this.maxLevel - 32, 8,  this.maxLevel);
    ctx.shadowBlur = 0
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
    )
  }

}


