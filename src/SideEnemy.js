import GameObject from './GameObject.js';
import { STATES, SCREEN, SIDES } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class SideEnemy extends GameObject{

  soundManager = window.soundManager;
  physics = window.physics;
  stateManager = window.stateManager
  resourceManager = window.resourceManager;

  gameController
  showDamage = false;
  topMargin =  32;
  direction = 0;
  speedX = 1;
  speedY = 2;
  moveInSpeed = this.speedY * 2
  id;
  health = 450;
  shootIntervalLow = 2;
  shootIntervalHigh = 2;
  shootInterval; 
  shootTimer = 0; 
  movingIn = true;
  killPoints = 50;
  hitPoints = 5;
  shotCount = 0;
  shotLimit = 8;
  marginBottom = 64;
  marginTop = 256

  size = {
    width: 64,
    height: 64,
  }

  startYPos = SCREEN.size.height ;

  constructor(gameController, side) {
    super();
    this.side = side;
    if (this.side === SIDES.left) {
      this.pos.x = 0 - this.size.width / 2;
    } else {
      this.pos.x = SCREEN.size.width - this.size.width / 2
    }
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
    if (this.movingIn || this.movingUp || this.movingDown) return;
    this.shootTimer++
    if(this.shootTimer >= this.shootInterval) {
      this.shoot();
      this.resetShootInterval();
      this.shootTimer = 0;
    }
  }

  shoot = () => {
    this.soundManager.playEnemySideShoot();
    this.gameController.bullets.addEnemyBulletSide(this.pos.x , this.pos.y + this.size.height, this.side )
    this.shotCount++;
    if (this.shotCount >= this.shotLimit) {
      this.movingUp = true;
      this.shotCount = 0;
    }
  }
  
  die = () => {
    this.soundManager.playDie();
    this.gameController.enemies.removeSweepingEnemy(this.id)
    this.stateManager.score.increaseCurrentScore(this.killPoints);
  }

  move = () => {
    if (this.movingIn && !this.movingUp && !this.movingDown) {
      if (this.pos.y >= SCREEN.size.height - this.marginBottom - this.size.height) {
        this.pos.y -= this.speedX;
      } else {
        this.movingIn = false;
      }
    }

    if (this.movingUp && !this.movingIn && !this.movingDown) {
      if (this.pos.y >= SCREEN.size.height - this.marginTop - this.size.height) {
        this.pos.y -= this.speedX;
      } else {
        this.movingIn = false;
        this.movingDown = true;
        this.movingUp = false;
      }
    }

    if (this.movingDown && !this.movingIn && !this.movingUp) {
      if (this.pos.y <= SCREEN.size.height - this.marginBottom - this.size.height) {
        this.pos.y += this.speedX;
      } else {
        this.movingIn = false;
        this.movingDown = false;
        this.movingUp = false;
      }
      
    }

  }

  takeDamage = () => {
    this.showDamage = true; 
    this.health -=  10;
    this.soundManager.playHit();
    this.stateManager.score.increaseCurrentScore(this.hitPoints);
    this.stateManager.score.increaseShotsHit();
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
    this.checkShoot();
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    if(this.showDamage){
      if (this.side === SIDES.left) {
        ctx.drawImage(
          this.resourceManager.get('./side-enemy-left-damage.png'), 
          this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
        )
      } else {
        ctx.drawImage(
          this.resourceManager.get('./side-enemy-right-damage.png'), 
          this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
        )

      }
      this.showDamage = false
    }else{
      if (this.side === SIDES.left) {
        ctx.drawImage(
          this.resourceManager.get('./side-enemy-left.png'), 
          this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
        )
      }else {
        ctx.drawImage(
          this.resourceManager.get('./side-enemy-right.png'), 
          this.pos.x, this.pos.y + this.topMargin, this.size.width,this.size.height
        )
      }
    }
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
    )
  }

}


