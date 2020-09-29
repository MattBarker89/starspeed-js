import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class Enemy extends GameObject{

  soundManager = window.soundManager;
  physics = window.physics;
  stateManager = window.stateManager
  resourceManager = window.resourceManager;

  gameController
  showDamage = false;
  topMargin =  32;
  direction = 0;
  speed = 6;
  id;
  health = 100;

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
    this.gameController = gameController
    this.direction = randomIntBetween(0,1);
    this.id = uuid();
  }
  
  die = () => {
    this.soundManager.playDie();
    this.gameController.enemies.removeEnemy(this.id)
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
    this.health -=  10;
    this.soundManager.playHit();
    if(this.health <= 0) this.die();
  
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
  } d 

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


