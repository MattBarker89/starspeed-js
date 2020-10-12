import GameObject from './GameObject.js'
import { STATES } from './constants.js'
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

  addEnemies = (count) => {
    for (let i = 0; i < count; i++) {
      this.enemies.push(new Enemy(this.gameController));
    }
  }

  removeEnemy = (id) => {
    this.enemies = this.enemies.filter(b => b.id !== id);
    this.enemies.push(new Enemy(this.gameController));   
  }


  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}
