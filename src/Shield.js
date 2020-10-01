import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'

export default class Shield extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  gameController

  shieldUp = false;
  shieldPoweringUp = false;
  shieldPowerUpDelay = 24
  sheildPowerUpCounter = 0;

  //4 //8 //16
  shieldStep = 0;
  shieldWidth;
  shieldMargin;
  shieldColor;

  shieldWidths = [1,2,4]
  shieldMargins = [4.8,16]
  shieldColors = [
    'rgba(50, 219, 255, 0.2)',
    'rgba(50, 219, 255, 0.6)',
    'rgba(50, 219, 255, 1.0)',
  ];

  constructor(gameController) {
    super();
    this.gameController = gameController;
  }

  shieldButtonIsDown = () => {
    return (this.gameController.inputManager.keyDowns.forwardSlash)
  }

  setShieldValues = () => {
    this.shieldWidth = this.shieldWidths[this.shieldStep]
    this.shieldColor = this.shieldColors[this.shieldStep]
    this.shieldMargin = this.shieldMargins[this.shieldStep]
  }

  incrementShield = () => {
    this.shieldStep++;
    if (this.shieldStep > 2) {
      this.shieldStep = 2
    }
  }

  checkShield = () => {

    this.setShieldValues();

    if (!this.shieldButtonIsDown()) {
      this.shieldStep = 0;
      this.shieldUp = false;
      return;
    }

    if (this.shieldUp) return;

    this.sheildPowerUpCounter++;
    if (this.sheildPowerUpCounter >= this.shieldPowerUpDelay) {
      this.incrementShield();
      this.sheildPowerUpCounter = 0;
    }

    
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    if (this.gameController.playerDead) return;
    this.checkShield();

  }

  render(ctx) {
    if (!this.correctState()) return;
    if (this.gameController.playerDead) return;
    ctx.beginPath();
    ctx.shadowBlur=10
    ctx.strok;
    ctx.strokeStyle = this.shieldColor;
    ctx.shadowColor="#36bbf5";
    ctx.lineWidth = this.shieldWidth;

      ctx.arc(
        this.gameController.player.pos.x + this.gameController.player.size.width / 2, 
        this.gameController.player.pos.y + this.gameController.player.size.height / 2, 
        this.gameController.player.size.width / 2 + this.shieldMargin , 
        0, 2 * Math.PI, false
      );
    

    ctx.stroke();
    ctx.shadowBlur=0
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }

}


