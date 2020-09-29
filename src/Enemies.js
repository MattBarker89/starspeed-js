import GameObject from './GameObject.js'
import { STATES } from './constants.js'
import PlayerBullet from './PlayerBullet.js';
import Enemy from './Enemy.js';
export default class Enemies extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  enemies = [];

  constructor(gameController) {
    super();
    this.playerBullets = []
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.enemies.forEach((e) => e.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.enemies.forEach((e) => e.render(ctx))

  }

  addEnemy = () => {
    this.enemies.push(new Enemy(this.gameController));
  }

  removeEnemy = (id) => {
    this.enemies = this.enemies.filter(b => b.id !== id);   
  }

  removeBullets = () => {
    this.enemies = this.enemies.filter(b => b.id === id );
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }
  

}
