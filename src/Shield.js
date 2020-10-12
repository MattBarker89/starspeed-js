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
  shieldPowerUpDelay = 6
  sheildPowerUpCounter = 0;

  //4 //8 //16
  shieldStep = 0;
  shieldWidth;
  shieldMargin;
  shieldColor;
  
  shieldParams = {
    off: {
      width: 0,
      margin: 0,
      color:'rgba(50, 219, 255, 0.0)',
    },
    one: {
      width: 1,
      margin: 4,
      color:'rgba(255, 204, 0, 0.2)',
    },
    two: {
      width: 2,
      margin: 6,
      color:'rgba(255, 204, 255, 0.4)',
    },
    three: {
      width: 5,
      margin: 8,
      color:'rgba(50, 219, 255, 1.0)',
    }
  }

  currentParam = this.shieldParams.off;

  constructor(gameController) {
    super();
    this.gameController = gameController;
  }

  shieldButtonIsDown = () => {
    return (this.gameController.inputManager.keyDowns.forwardSlash)
  }


  incrementShield = () => {
    this.shieldPoweringUp = true;
    if (this.currentParam === this.shieldParams.off) {
      this.currentParam = this.shieldParams.one;
      this.soundManager.playShieldUp1();
    } else if (this.currentParam === this.shieldParams.one) {
      this.currentParam = this.shieldParams.two;
      this.soundManager.playShieldUp2();
    } else if (this.currentParam === this.shieldParams.two) {
      this.currentParam = this.shieldParams.three;
      this.soundManager.playShieldUp3();
      this.shieldUp = true;
    } else  {
      return;
    }
  }

  checkShield = () => {

    if (!this.shieldButtonIsDown()) {
      this.currentParam = this.shieldParams.off;
      if (this.shieldUp){
        this.shieldUp = false;
        this.shieldPoweringUp = false;
        this.soundManager.playShieldOff();
      }

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
    ctx.strokeStyle = this.currentParam.color;
    ctx.shadowColor="#36bbf5";
    ctx.lineWidth = this.currentParam.width;
    if (this.shieldPoweringUp) {
      ctx.arc(
        this.gameController.player.pos.x + this.gameController.player.size.width / 2, 
        this.gameController.player.pos.y + this.gameController.player.size.height / 2, 
        this.gameController.player.size.width / 2 + this.currentParam.margin , 
        0, 2 * Math.PI, false
      );
    }
    ctx.stroke();
    ctx.shadowBlur=0
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}


