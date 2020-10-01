import { STATES } from './constants.js'
import Player from './Player.js';
import Bullets from './Bullets.js';
import Physics from './Physics.js';
import Enemies from './Enemies.js';
import Shield from './Shield.js';
import Enemy from './Enemy.js';

export default class GameController {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  inputManager = window.inputManager;
  resourceManager = window.resourceManager;

  playerDead = false;
  isRespawning = false;
  respawnLimit = 200;
  respawnCounter = 0;

  physics
  bullets;
  enemies;
  player;
  shield;


  constructor() {
    this.physics = new Physics(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.player = new Player(this);
    this.shield = new Shield(this);
    this.enemies.addEnemies(4);
  }

  reStart = () => {
    this.physics = new Physics(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.player = new Player(this);
    this.shield = new Shield(this);
    this.enemies.addEnemies(4);
  }

  
  checkForRespawn = () => {
    if (!this.playerDead) return;
    this.respawnCounter++;
    if(this.respawnCounter >= this.respawnLimit) {
      this.reStart();
      this.respawnCounter = 0;
      this.playerDead = false;
    }
  }
  
  gameOver = () => {
    this.playerDead = true;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.bullets.tick(deltaTime)
    this.enemies.tick(deltaTime)
    this.player.tick(deltaTime)
    this.shield.tick(deltaTime);
    this.checkForRespawn(deltaTime);

  }

  render(ctx) {
    if (!this.correctState()) return;
    this.bullets.render(ctx)
    this.enemies.render(ctx);
    this.player.render(ctx)
    this.shield.render(ctx);
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }

}


