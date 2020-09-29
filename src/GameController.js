import { STATES } from './constants.js'
import Player from './Player.js';
import Bullets from './Bullets.js';
import Enemy from './Enemy.js';
import Physics from './Physics.js';

export default class GameController {

  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  physics
  bullets;
  enemy;
  player;
  
  constructor() {
    this.physics = new Physics(this);
    this.bullets = new Bullets(this);
    this.enemy = new Enemy(this);
    this.player = new Player(this);
  }


  tick(deltaTime) {
    if (!this.correctState()) return;
    this.bullets.tick(deltaTime)
    this.enemy.tick(deltaTime)
    this.player.tick(deltaTime)
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.bullets.render(ctx)
    this.enemy.render(ctx);
    this.player.render(ctx)
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }



}


