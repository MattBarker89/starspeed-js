import GameObject from './GameObject.js'
import { SIDES, STATES } from './constants.js'
import SlowAsteroid from './SlowAsteroid.js';
import FastAsteroid from './FastAsteroid.js'

export default class Asteroid extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  slowAsteroids = [];
  fastAsteroids = []

  lastSide = SIDES.left;

  constructor(gameController) {
    super();
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.slowAsteroids.forEach((s) => s.tick(deltaTime))
    this.fastAsteroids.forEach((f) => f.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.slowAsteroids.forEach((s) => s.render(ctx))
    this.fastAsteroids.forEach((f) => f.render(ctx))
  }

  addSlowAsteroids = (count) => {
    for (let i = 0; i < count * 4 ; i++) {
      this.slowAsteroids.push(new SlowAsteroid(this.gameController, this.lastSide));
      this.lastSide = !this.lastSide;
    }
  }

  removeSlowAsteroid = (id) => {
    this.slowAsteroids = this.slowAsteroids.filter(s => s.id !== id);  
  }

  addFastAsteroids = (count) => {
    for (let i = 0; i < count * 6; i++) {
      this.fastAsteroids.push(new FastAsteroid(this.gameController, this.lastSide));
      this.lastSide = !this.lastSide;
    }
  }

  removeFastAsteroid = (id) => {
    this.fastAsteroids = this.fastAsteroids.filter(f => f.id !== id);  
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}
