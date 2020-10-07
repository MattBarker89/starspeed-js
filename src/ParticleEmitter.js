import { SCREEN, STATES } from './constants.js';
import GameObject from './GameObject.js';
import Particle from './Particle.js'

export default class ParticleEmitter extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager
  
  particles = [];

  gameObject

  particleTimeOut = 1
  particleCounter = 0

  index = 0;
  settings= {
    density: 50,
  }

  constructor(gameObject) {
    super();
    this.gameObject = gameObject
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    for (var i = 0; i < this.settings.density; i++) {
      if (this.particleCounter >= this.particleTimeOut) {
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
    )
  }

}


