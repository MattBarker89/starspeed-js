import { SCREEN, STATES } from './constants.js';
import { randomIntBetween, uuid } from './utilities.js'
import GameObject from './GameObject.js';

export default class Particle extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager

  particleEmitter;
  id;
  life;
  vx;
  vy;
  gravity;
  options = {}

  constructor(particleEmitter) {
    super();
    this.particleEmitter = particleEmitter;
    this.options = this.particleEmitter.particleOptions;
    this.pos.x = this.options.startingX;
    this.pos.y = this.options.startingY;
    this.vx = this.options.vx;
    this.vy = this.options.vy;
    this.gravity = this.options.gravity;
    this.id = uuid();
    this.life = 0;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.pos.x += this.vx;
    this.pos.y += this.vy;
    this.vy += this.gravity;
    this.life++;
    if (this.life >= this.options.maxLife) this.particleEmitter.removeParticle(this.id)
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.fillStyle="#36bbf5"; 
    ctx.arc(this.pos.x, this.pos.y, this.options.particleSize, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
    )
  }

}


