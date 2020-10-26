import GameObject from './GameObject.js'
import { SIDES, STATES } from './constants.js'
import Enemy from './Enemy.js';
import SweepingEnemy from './SweepingEnemy.js';
import SideEnemy from './SideEnemy.js';
export default class Enemies extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  enemies = [];
  sweepingEnemies = []

  lastSide = SIDES.left;

  constructor(gameController) {
    super();
    this.playerBullets = []
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.enemies.forEach((e) => e.tick(deltaTime))
    this.sweepingEnemies.forEach((e) => e.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.enemies.forEach((e) => e.render(ctx))
    this.sweepingEnemies.forEach((e) => e.render(ctx))
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

  addSweepingEnemies = (count) => {
    for (let i = 0; i < count; i++) {
      this.sweepingEnemies.push(new SweepingEnemy(this.gameController));
    }
  }

  removeSweepingEnemy = (id) => {
    this.sweepingEnemies = this.sweepingEnemies.filter(b => b.id !== id);
    this.sweepingEnemies.push(new SweepingEnemy(this.gameController));   
  }

  addSideEnemies = (count) => {
    for (let i = 0; i < count; i++) {
      this.sweepingEnemies.push(new SideEnemy(this.gameController, this.lastSide));
      this.lastSide = !this.lastSide;
    }
  }

  removeSideEnemy = (id) => {
    this.sweepingEnemies = this.sweepingEnemies.filter(b => b.id !== id);
    this.sweepingEnemies.push(new SideEnemy(this.gameController));   
  }


  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}
