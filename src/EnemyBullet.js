import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class PlayerBullet extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;
  speed = 6;


  constructor(x,y, gameController) {
    super();
    this.size.width = 8;
    this.size.height = 32;  
    this.pos.x = x - this.size.width / 2 
    this.pos.y = y
    this.id = uuid();
    this.gameController = gameController
  }

  tick(deltaTime) {
    this.move();
    this.checkBounds();
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.drawImage(this.resourceManager.get('./enemy-bullet.png'), this.pos.x, this.pos.y, this.size.width,this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  checkBounds = () => {
    if (this.pos.y >= SCREEN.size.height + this.size.height) {
      this.gameController.bullets.removeEnemyBullet(this.id)
    }
  }


  move() {
    this.pos.y += this.speed;
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}


