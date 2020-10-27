import GameObject from './GameObject.js';
import { STATES, SCREEN, SIDES } from './constants.js'
import { randomIntBetween, uuid } from './utilities.js'

export default class ExtraLife extends GameObject{

  soundManager = window.soundManager;
  physics = window.physics;
  stateManager = window.stateManager
  resourceManager = window.resourceManager;

  gameController
  speed = 2;
  id;

  size = {
    width: 32,
    height: 32,
  }

  constructor(gameController, side) {
    super();
    this.side = side;
    if (this.side === SIDES.left) {
      this.pos.x = 0 - this.size.width;
    } else {
      this.pos.x = SCREEN.size.width + this.size.width
    } 
    this.pos.y = SCREEN.size.height - 64
    this.gameController = gameController
    this.id = uuid();
  }

  checkBounds = () => {
    if (this.pos.x >= SCREEN.size.width - this.size.width);
  }

  move = () => {
    if (this.side === SIDES.left) {
      this.pos.x += this.speed;
    } else {
      this.pos.x -= this.speed;
    } 
  }

  checkPlayerCollision = () => {
    if (this.gameController.physics.checkCollisionsWithPlayer(this)) {
      this.gameController.pickups.removeExtraLife(this.id);
      this.stateManager.playerLives ++;
      this.soundManager.playExtraLife();
    }
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkPlayerCollision();
    this.move();
    this.checkBounds();
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
      ctx.drawImage(
        this.resourceManager.get('./extra-life.png'), 
        this.pos.x, this.pos.y, this.size.width,this.size.height
      )
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      &&
      this.stateManager.gameState !== STATES.game.gameOver
    )
  }

}


