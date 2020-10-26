import GameObject from './GameObject.js'
import { STATES } from './constants.js'
import PlayerBullet from './PlayerBullet.js';
import EnemyBullet from './EnemyBullet.js';
import EnemyBulletSide from './EnemyBulletSide.js'
export default class Bullets extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  playerBullets = [];
  enemyBullets = [];
  enemyBulletsSide = [];

  constructor(gameController) {
    super();
    this.playerBullets = []
    this.enemyBullets = []
    this.enemyBulletsSide = []
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.playerBullets.forEach((bullet) => bullet.tick(deltaTime))
    this.enemyBullets.forEach((bullet) => bullet.tick(deltaTime))
    this.enemyBulletsSide.forEach((bullet) => bullet.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.playerBullets.forEach((bullet) => bullet.render(ctx))
    this.enemyBullets.forEach((bullet) => bullet.render(ctx))
    this.enemyBulletsSide.forEach((bullet) => bullet.render(ctx))
  }

  addPlayerBullet = (x,y) => {
    this.playerBullets.push(new PlayerBullet(x,y,this.gameController));
  }

  removePlayerBullet = (id) => {
    this.playerBullets = this.playerBullets.filter(b => b.id !== id);   
  }

  addEnemyBullet = (x,y) => {
    this.enemyBullets.push(new EnemyBullet(x,y, this.gameController));
  }

  removeEnemyBullet = (id) => {
    this.enemyBullets = this.enemyBullets.filter(b => b.id !== id);   
  }

  addEnemyBulletSide = (x,y, side) => {
    this.enemyBulletsSide.push(new EnemyBulletSide(x,y, this.gameController, side));
  }

  removeEnemyBulletSide = (id) => {
    this.enemyBulletsSide = this.enemyBulletsSide.filter(b => b.id !== id);   
  }


  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }
  
}
