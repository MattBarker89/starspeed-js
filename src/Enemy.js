import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween } from './utilities.js'

export default class Enemy extends GameObject{

  physics = window.physics;
  stateManager = window.stateManager
  resourceManager = window.resourceManager;

  gameController
  showDamage = false;
  topMargin =  32;
  direction = 0;
  speed = 32;

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
    this.pos.x = randomIntBetween(0, SCREEN.size.width - this.size.width)
    this.pos.y = 0;
    this.speed = randomIntBetween(5, 9);
    this.gameController = gameController
    this.direction = randomIntBetween(0,1);
    console.log(this.direction)
  }

  checkBounds = () => {
    if (this.pos.x >= SCREEN.size.width - this.size.width) this.direction = 1
    if (this.pos.x <= 0) this.direction = 0
  }

  move = () => {
    if (this.direction === 0) {
      this.pos.x += this.speed;
    } else if (this.direction === 1) { 
      this.pos.x -= this.speed;
    }
  }

  takeDamage = () => {
    this.showDamage = true; 
  }

  checkBulletCollisions = () => {
    if (this.gameController.physics.checkCollisionsWithPlayerBullets(this)) {
      this.takeDamage()
    }
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkBulletCollisions();
    this.move();
    this.checkBounds();
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    if(this.showDamage){
      ctx.drawImage(
        this.resourceManager.get('./enemy-damage.png'), 
        this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
      )
      this.showDamage = false
    }else{
      ctx.drawImage(
        this.resourceManager.get('./enemy.png'), 
        this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
      )
    }
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  move() {

  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
    )
  }

}


