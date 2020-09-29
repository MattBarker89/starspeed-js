import GameController from './GameController.js';

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
    if (this.hasCollided(player,a)) { 
      let collisionDetected = true;
    }
    return 
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
    )
  }

}


