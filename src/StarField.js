import GameObject from './GameObject.js'
import { STATES } from './constants.js'
import Star from './Star.js';
export default class StarField extends GameObject {
  stateManager = window.stateManager;

  stars = [];

  constructor() {
    super();
    this.increaseStars(60);
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.stars.forEach((star) => star.tick(deltaTime))
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.stars.forEach((star) => star.render(ctx))
  }

  increaseStars(ammount) {
    for (let i = 0; i < ammount; i++) {
      this.stars.push(new Star());
    }
  }

  reduceStars(ammount) {
    for (let i = 0; i < ammount; i++) {
      this.stars = this.stars.splice(0,ammount);
    }
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      || this.stateManager.systemState === STATES.system.menu
      )
  }
  

}
