import { STATES } from './constants.js'
import Player from './Player.js';
import Bullets from './Bullets.js';
import Physics from './Physics.js';
import Enemies from './Enemies.js';
import Asteroids from './Asteroids.js'
import Hud from './Hud.js'
import GameOver from './GameOver.js';
import ParticleEmitter from './ParticleEmitter.js';
import ParticleEmitters from './ParticleEmitters.js';
import Pickups from './Pickups.js'

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
  particleEmitters;
  bullets;
  enemies;
  pickups;
  player;
  hud;
  gameOver;

  constructor() {
    this.physics = new Physics(this);
    this.particleEmitters = new ParticleEmitters(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.asteroids = new Asteroids(this);
    this.pickups = new Pickups(this);
    this.player = new Player(this);
    this.hud = new Hud(this);
    this.gameOver  = new GameOver(this)
    this.enemies.addEnemies(2);
    this.enemies.addSweepingEnemies(1);
    this.enemies.addSideEnemies(2);
    this.pickups.addExtraLife();
    this.pickups.addPowerUp();
    this.asteroids.addSlowAsteroids(4);
    this.asteroids.addFastAsteroids(6);
  }

  reStart = () => {
    this.physics = new Physics(this);
    this.particleEmitters = new ParticleEmitters(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.player = new Player(this);
    this.hud = new Hud(this);
    this.enemies.addEnemies(2);
    this.enemies.addSweepingEnemies(1);
  }

  checkForRespawn = () => {
    if (!this.playerDead && this.stateManager.gameState !== STATES.game.gameOver) return;
    this.respawnCounter++;
    if(this.respawnCounter >= this.respawnLimit) {
      this.reStart();
      this.respawnCounter = 0;
      this.playerDead = false;
    }
  }

  changeToGameOver = () => {
    this.stateManager.gameState = STATES.game.gameOver
  }
  
  loseLife = () => {
    this.playerDead = true;
    this.stateManager.playerLives--;
    if (this.stateManager.playerLives <= 0) this.changeToGameOver();
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.particleEmitters.tick(deltaTime)
    this.bullets.tick(deltaTime)
    this.enemies.tick(deltaTime)
    this.asteroids.tick(deltaTime)
    this.pickups.tick(deltaTime)
    this.player.tick(deltaTime)
    this.hud.tick(deltaTime)
    this.gameOver.tick(deltaTime)
    this.checkForRespawn(deltaTime);
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.particleEmitters.render(ctx)
    this.bullets.render(ctx)
    this.enemies.render(ctx);
    this.asteroids.render(ctx);
    this.pickups.render(ctx);
    this.player.render(ctx)
    this.gameOver.render(ctx)
    this.hud.render(ctx)
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }

}
