import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class SlowAsteroid extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;
  speed = 2;


  constructor(gameController) {
    super();
    this.size.width = 32;
    this.size.height = 32;  
    this.pos.x = randomIntBetween(0, SCREEN.size.width - this.size.width) 
    this.pos.y = 0 - randomIntBetween(this.size.height, 10240);
    this.speed = randomIntBetween(4,8);
    this.id = uuid();
    this.gameController = gameController
  }

  tick(deltaTime) {
    this.move();
    this.checkBounds();
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.drawImage(this.resourceManager.get('./fast-asteroid.png'), this.pos.x, this.pos.y, this.size.width,this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  checkBounds = () => {
    if (this.pos.y >= SCREEN.size.height + this.size.height) {
      this.gameController.asteroids.removeFastAsteroid(this.id)
    }
  }


  move() {
    this.pos.y += this.speed;
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
      )
  }

}


