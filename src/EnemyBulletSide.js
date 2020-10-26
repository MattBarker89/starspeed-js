import GameObject from './GameObject.js';
import { STATES, SCREEN, SIDES } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class PlayerBullet extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;
  speed = 6;


  constructor(x,y, gameController, side) {
    super();
    this.side = side
    this.size.width = 32;
    this.size.height = 8;  
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
    ctx.drawImage(this.resourceManager.get('./enemy-bullet-side.png'), this.pos.x, this.pos.y, this.size.width,this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  checkBounds = () => {

    if (this.side === SIDES.left) {
      if (this.pos.x >= SCREEN.size.width + this.size.height) {
        this.gameController.bullets.removeEnemyBulletSide(this.id)
      }
    } else {
      if (this.pos.x <= 0 - this.size.height) {
        this.gameController.bullets.removeEnemyBulletSide(this.id)
      }

    }
  }


  move() {
    if (this.side === SIDES.left) {
      this.pos.x += this.speed;
    } else{ 
      this.pos.x -= this.speed;
    }
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}


