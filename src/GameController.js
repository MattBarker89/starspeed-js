import { STATES } from './constants.js'
import Player from './Player.js';
import Bullets from './Bullets.js';
import Enemy from './Enemy.js';
import Physics from './Physics.js';
import Enemies from './Enemies.js';

export default class GameController {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  physics
  bullets;
  enemies;
  player;
  
  constructor() {

    this.physics = new Physics(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.player = new Player(this);
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
    this.enemies.addEnemy();
  }


  tick(deltaTime) {
    if (!this.correctState()) return;
    this.bullets.tick(deltaTime)
    this.enemies.tick(deltaTime)
    this.player.tick(deltaTime)
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.bullets.render(ctx)
    this.enemies.render(ctx);
    this.player.render(ctx)
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }



}


