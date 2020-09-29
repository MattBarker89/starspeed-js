import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween } from './utilities.js'

export default class Player extends GameObject {
  soundManager = window.soundManager;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  addPlayerBullet
  canShoot = true;
  shootCoolDownCounter = 0
  shootCoolDownRate = 16  
  
  gameController

  speed = 8;
  bottomMargin =  32;
  size = {
    width: 64,
    height: 64,
  }

  pos = {
    x: 100,
    y:100,
  }

  constructor(gameController) {
    super();
    this.size.width = 64;
    this.size.height = 64;
    this.pos.x = SCREEN.size.width / 2 - this.size.width / 2; 
    this.pos.y = SCREEN.size.height - this.size.height - this.bottomMargin;
    this.gameController = gameController;
  }

  checkShootCoolDown() {
    if (this.canShoot) return;
    this.shootCoolDownCounter++
    if (this.shootCoolDownCounter >= this.shootCoolDownRate){
      this.shootCoolDownCounter = 0;
      this.canShoot = true;
    }
  }


  checkFire() {
    if (!this.canShoot) return
    if(this.inputManager.keyDowns.space) {
      this.gameController.bullets.addPlayerBullet   (this.pos.x + this.size.width /2 , this.pos.y)
      this.soundManager.playShoot();
      this.canShoot = false;
    }
  }

  checkBounds() {
    if(this.pos.x <= 0) {
      this.pos.x = 0;
    }
    if(this.pos.x >= SCREEN.size.width - this.size.width) {
      this.pos.x = SCREEN.size.width - this.size.width ;
    } 
  }

  checkMovement() {
    if(this.inputManager.keyDowns.left) {
      this.pos.x = this.pos.x -= this.speed;
    } 

    if(this.inputManager.keyDowns.right) {
      this.pos.x = this.pos.x += this.speed
    };
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkFire();
    this.checkMovement()
    this.checkBounds();
    this.checkShootCoolDown();
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.drawImage(this.resourceManager.get('./player.png'), this.pos.x, this.pos.y, this.size.width,this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }

}


