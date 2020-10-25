import { SCREEN, STATES } from './constants.js';
import { randomIntBetween } from './utilities.js'
import GameObject from './GameObject.js';
import Particle from './Particle.js'

export default class PlayerEngine extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager
  
  particles = [];

  gameObject

  particleTimeOut = 1
  particleCounter = 0
  density = 5;
  particleOptions = {
    particleSize: 2,
    gravity: 0.7,
    maxLife: 100,
    startingX: 0,
    startingY: 0,
    vx: 0,
    vy: 0,
  }

  constructor(gameObject) {
    super();
    this.gameObject = gameObject
  }

  updateParticleOptions = () => {
    this.particleOptions.startingX = this.gameObject.pos.x + this.gameObject.size.width / 2
    this.particleOptions.startingY = this.gameObject.pos.y + this.gameObject.size.height;
    this.particleOptions.vx = randomIntBetween(-0.8, 0.8);
    this.particleOptions.vy = randomIntBetween(0, 2);
    this.particleOptions.particleSize = randomIntBetween(1, 2);
    this.particleOptions.maxLife =  randomIntBetween(80,100);
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    for (var i = 0; i < this.density; i++) {
      if (this.particleCounter >= this.particleTimeOut) {
        this.updateParticleOptions();
        this.particles.push(new Particle(this));
        this.particleCounter = 0;
      } 
    }
    this.particles.forEach((particle) => particle.tick(deltaTime))
    this.particleCounter++;
  } 

  removeParticle = (id) => {
    this.particles = this.particles.filter(p => p.id !== id);   
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.particles.forEach((particle) => particle.render(ctx))
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver 
      && 
      !this.gameObject.shield.shieldUp
    )
  }

}


