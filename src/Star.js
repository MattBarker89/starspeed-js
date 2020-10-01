import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween } from './utilities.js'

export default class Star extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager

  constructor() {
    super();
    this.pos.x = randomIntBetween(0, SCREEN.size.width)
    this.pos.y = randomIntBetween(0, SCREEN.size.height)
    this.speed = randomIntBetween(5, 9);
    this.size.width = this.speed / 3 ;
    this.size.height = this.speed / 3;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.move();
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "WHITE";
    ctx.beginPath();
    ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  move() {
    this.pos.y += this.speed
    if (this.pos.y >= SCREEN.size.height) {
      this.resetPosition(); 
    } 
  }

  resetPosition() {
    this.pos.x = randomIntBetween(0, SCREEN.size.width)
    this.pos.y = randomIntBetween(0 - SCREEN.size.height,0)
    this.speed = randomIntBetween(5, 9);
    this.size.width = this.speed / 3 ;
    this.size.height = this.speed / 3;
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      || this.stateManager.systemState === STATES.system.menu
    )
  }

}


