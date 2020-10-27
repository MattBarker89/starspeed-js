export default class Physics {

  gameController;

  constructor(gameController) {
    this.gameController = gameController
  }

  checkCollisionsWithPlayerBullets = (a) => { 
    if(this.gameController.bullets.playerBullets.length <= 0) return;
    let collisionDetected = false;
    this.gameController.bullets.playerBullets.forEach((b) => {
      if (this.hasCollided(a,b)) { 
        collisionDetected = true;
        this.gameController.bullets.removePlayerBullet(b.id)
      }
    })
    return collisionDetected;
  }

  checkCollisionsWithEnemyBullets = (a) => { 
    if(this.gameController.bullets.enemyBullets.length <= 0) return;
    let collisionDetected = false;
    this.gameController.bullets.enemyBullets.forEach((b) => {
      if (this.hasCollided(a,b)) { 
        collisionDetected = true;
        this.gameController.bullets.removeEnemyBullet(b.id)
        if (this.gameController.player.shield.shieldUp) {
          
        }

      }
    })
    return collisionDetected;
  }

  checkCollisionsWithEnemyBulletsSide = (a) => { 
    if(this.gameController.bullets.enemyBulletsSide.length <= 0) return;
    let collisionDetected = false;
    this.gameController.bullets.enemyBulletsSide.forEach((b) => {
      if (this.hasCollided(a,b)) { 
        collisionDetected = true;
        this.gameController.bullets.removeEnemyBulletSide(b.id)
        if (this.gameController.player.shield.shieldUp) {
          
        }

      }
    })
    return collisionDetected;
  }

  checkCollisionsWithFastAsteroids = (a) => { 
    if(this.gameController.asteroids.fastAsteroids.length <= 0) return;
    let collisionDetected = false;
    this.gameController.asteroids.fastAsteroids.forEach((b) => {
      if (this.hasCollided(a,b)) { 
        collisionDetected = true;
        this.gameController.asteroids.removeFastAsteroid(b.id)
      }
    })
    return collisionDetected;
  }

  checkCollisionsWithSlowAsteroids = (a) => { 
    if(this.gameController.asteroids.slowAsteroids.length <= 0) return;
    let collisionDetected = false;
    this.gameController.asteroids.slowAsteroids.forEach((b) => {
      if (this.hasCollided(a,b)) { 
        collisionDetected = true;
        this.gameController.asteroids.removeSlowAsteroid(b.id)
      }
    })
    return collisionDetected;
  }

  checkCollisionsWithEnemies = (a) => {
    let collisionDetected = false;
    this.enemies.forEach((b) => {
      if (this.hasCollided(b,a)) { 
        collisionDetected = true;
      }
    })
    return collisionDetected;
  } 

  checkCollisionsWithPlayer = (a) => {
    let collisionDetected = false;
    if (this.hasCollided(this.gameController.player,a)) { 
      collisionDetected = true;
    }
    return collisionDetected
  } 

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkCollisions()
  }

  hasCollided = (a, b) => {
    return !(
        ((a.pos.y + a.size.height) < (b.pos.y)) ||
        (a.pos.y > (b.pos.y + b.size.height)) ||
        ((a.pos.x + a.size.width) < b.pos.x) ||
        (a.pos.x > (b.pos.x + b.size.width))
    );
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
    )
  }

}
