import { SCREEN, STATES } from './constants.js';
import { randomIntBetween, uuid } from './utilities.js'
import GameObject from './GameObject.js';

export default class Particle extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager

  particleEmitter;
  particles = [];
  id;
  settings = {
    particleSize: 2,
    startingX: 0,
    startingY: 0,
    gravity: 0.7,
    maxLife: 100,
  }

  constructor(particleEmitter) {
    super();
    this.particleEmitter = particleEmitter;
    this.settings.startingX = 
      this.particleEmitter.gameObject.pos.x + 
      this.particleEmitter.gameObject.size.width / 2,
    this.settings.startingY = 
      this.particleEmitter.gameObject.pos.y +
      this.particleEmitter.gameObject.size.height,
    this.pos.x = this.settings.startingX;
    this.pos.y = this.settings.startingY;
    this.vx = randomIntBetween(-0.8, 0.8)
    this.vy = randomIntBetween(0, 2)
    // this.vx = Math.random() * 20 - 10; left / right
    // this.vy = Math.random() * 20 - 5; high / low


    this.id = uuid();
    this.life = 0;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.pos.x += this.vx;
    this.pos.y += this.vy;
    this.vy += this.settings.gravity;
    this.life++;
    if (this.life >= this.settings.maxLife) this.particleEmitter.removeParticle(this.id)
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.clearRect(this.settings.leftWall, this.settings.groundLevel, SCREEN.size.width, SCREEN.size.height);
    ctx.beginPath();
    ctx.fillStyle="#36bbf5";
    ctx.arc(this.pos.x, this.pos.y, this.settings.particleSize, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
    )
  }

}


