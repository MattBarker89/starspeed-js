import GameObject from './GameObject.js'
import { STATES } from './constants.js'
import ParticleEmitter from './ParticleEmitter.js';
export default class ParticleEmitters extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  particleEmitters = [];

  constructor(gameController) {
    super();
    this.particleEmitters = []
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.particleEmitters.forEach((p) => p.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.particleEmitters.forEach((p) => p.render(ctx))
  }

  addParticleEmitter = () => {
    for (let i = 0; i < count; i++) {
      this.enemies.push(new Enemy(this.gameController));
    }
  }

  removeParticleEmitter = (id) => {
    this.particleEmitters = this.enemies.filter(b => b.id !== id);
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
