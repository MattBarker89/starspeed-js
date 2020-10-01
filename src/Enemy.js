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
  speed = 4;
  moveInSpeed = this.speed * 2
  id;
  health = 50;
  shootIntervalLow = 10;
  shootIntervalHigh = 40;
  shootInterval; 
  shootTimer = 0; 
  movingIn = true;

  size = {
    width: 64,
    height: 64,
  }

  startYPos = -this.size.height * 20 ;
  pos = {
    x: 100,
    y:100,
  }

  constructor(gameController) {
    super();
    this.pos.x = randomIntBetween(0, SCREEN.size.width - this.size.width)
    this.pos.y = this.startYPos;
    this.gameController = gameController
    this.direction = randomIntBetween(0,1);
    this.id = uuid();
    this.resetShootInterval();
  }

  resetShootInterval = () => {
    this.shootInterval = randomIntBetween(this.shootIntervalLow, this.shootIntervalHigh) * 10
  }

  checkShoot = () => {
    if (this.movingIn) return;
    this.shootTimer++
    if(this.shootTimer >= this.shootInterval) {
      this.shoot();
      this.resetShootInterval();
      this.shootTimer = 0;
    }
  }

  shoot = () => {
    this.soundManager.playEnemyShoot();
    this.gameController.bullets.addEnemyBullet(this.pos.x + this.size.width /2 , this.pos.y + this.size.height )
  }
  
  die = () => {
    this.soundManager.playDie();
    this.gameController.enemies.removeEnemy(this.id)
  }

  checkBounds = () => {
    if (this.pos.x >= SCREEN.size.width - this.size.width) this.direction = 1
    if (this.pos.x <= 0) {
      this.direction = 0
    }
  }

  move = () => {
    if(this.pos.y < this.topMargin - this.size.height / 2) {
      this.pos.y += this.moveInSpeed;
    } else {
      this.movingIn = false;
      if (this.direction === 0) {
        this.pos.x += this.speed;
      } else if (this.direction === 1) { 
        this.pos.x -= this.speed;
      }
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
    this.checkShoot();
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

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
    )
  }

}


