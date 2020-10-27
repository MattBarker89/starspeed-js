import GameObject from './GameObject.js'
import { SIDES, STATES } from './constants.js'
import PowerUp from './Powerup.js'
import ExtraLife from './ExtraLife.js';

export default class Pickups extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  powerUps = [];
  extraLives = []

  lastSide = SIDES.left;

  constructor(gameController) {
    super();
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.powerUps.forEach((p) => p.tick(deltaTime))
    this.extraLives.forEach((e) => e.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.powerUps.forEach((p) => p.render(ctx))
    this.extraLives.forEach((e) => e.render(ctx))
  }

  addPowerUp = () => {
    this.powerUps.push(new PowerUp(this.gameController, this.lastSide));
    this.lastSide = !this.lastSide;
  }

  removePowerUp = (id) => {
    this.powerUps = this.powerUps.filter(p => p.id !== id); 
  }

  addExtraLife = () => {
    this.extraLives.push(new ExtraLife(this.gameController, this.lastSide));
    this.lastSide = !this.lastSide;
}

removeExtraLife = (id) => {
  this.extraLives = this.extraLives.filter(e => e.id !== id); 
}

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}
