import GameObject from './GameObject.js';
import Shield from './Shield.js'
import PowerUpMeter from './PowerUpMeter.js'
import { STATES, SCREEN } from './constants.js'
import PlayerEngine from './PlayerEngine.js';

export default class Player extends GameObject {
  soundManager = window.soundManager;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  shield
  powerUpMeter
  playerEngine

  addPlayerBullet
  canShoot = true;
  shootCoolDownCounter = 0
  shootCoolDownRate = 12;  
  powerUpCountDown;
  
  gameController

  speed = 8;
  speedVert = 4;
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
    this.shield = new Shield(this.gameController)
    this.powerUpMeter = new PowerUpMeter(this.gameController)
    this.playerEngine = new PlayerEngine(this);
  }

  die = () => {
    this.soundManager.playPlayerDie();
    this.gameController.loseLife();
  }

  checkBulletCollisions = () => {
    if (this.gameController.physics.checkCollisionsWithEnemyBullets(this) || 
    this.gameController.physics.checkCollisionsWithEnemyBulletsSide(this)) {
      if(!this.shield.shieldUp) {
        this.die()
      } else {
        this.soundManager.playShieldHit();
      }
    } 
  }

  checkAsteroidCollisions = () => {
    if (this.gameController.physics.checkCollisionsWithFastAsteroids(this) || 
    this.gameController.physics.checkCollisionsWithSlowAsteroids(this)) {
      if(!this.shield.shieldUp) {
        this.die()
      } else {
        this.soundManager.playShieldHit();
      }
    } 
  }

  checkPowerUpCountDown = () => {
    if (this.powerUpCountDown > 0) this.powerUpCountDown--;
    if (this.powerUpCountDown > 0) this.shootCoolDownRate = 6;
    if (this.powerUpCountDown === 0) this.shootCoolDownRate = 12;

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
    if (!this.canShoot || this.shield.shieldUp) return
    if(this.inputManager.keyDowns.space ) {
      this.gameController.bullets.addPlayerBullet(this.pos.x + this.size.width /2 , this.pos.y)
      this.soundManager.playShoot();
      this.canShoot = false;
      this.stateManager.score.increaseShotsFired();
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
    if (this.inputManager.keyDowns.left) {
      this.pos.x = this.pos.x -= this.speed;
    } 

    if (this.inputManager.keyDowns.right) {
      this.pos.x = this.pos.x += this.speed
    };

    if (this.inputManager.keyDowns.up && !this.shieldUp) {
      if (this.pos.y >= SCREEN.size.height / 2) {
        this.pos.y -= this.speedVert;
      }
    } else {
       this.pos.y += this.speedVert;
    }

    if ( this.pos.y >= SCREEN.size.height - this.size.height - this.bottomMargin) {
      this.pos.y = SCREEN.size.height - this.size.height - this.bottomMargin
    }
   
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    if (this.gameController.playerDead) return;
    this.shield.tick(deltaTime)
    this.powerUpMeter.tick(deltaTime)
    this.playerEngine.tick(deltaTime)
    this.checkFire();
    this.checkMovement();
    this.checkBounds();
    this.checkShootCoolDown();
    this.checkPowerUpCountDown();
    this.checkBulletCollisions();
    this.checkAsteroidCollisions();
  }

  render(ctx) {
    if (!this.correctState()) return;
    if (this.gameController.playerDead) return;
    this.shield.render(ctx);
    this.playerEngine.render(ctx);
    ctx.beginPath();
    ctx.drawImage(this.resourceManager.get('./player.png'), this.pos.x, this.pos.y, this.size.width,this.size.height);
    this.powerUpMeter.render(ctx)
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


