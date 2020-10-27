import { STATES, ROUNDS } from './constants.js'
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
  roundLimit = 384;
  nextRound = false;
  roundIndex = 0;
  gameStarted = false;

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
  }

  reStart = () => {
    this.physics = new Physics(this);
    this.particleEmitters = new ParticleEmitters(this);
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.asteroids = new Asteroids(this);
    this.pickups = new Pickups(this);
    this.player = new Player(this);
    this.hud = new Hud(this);
    this.gameOver  = new GameOver(this)
    this.spawnNextRound();
  }

  checkForNextRound = () => {
    if (this.enemies.allDead() && !this.nextRound) {
      this.soundManager.playRoundComplete();
      this.nextRound = true;
    }
    this.countForNextRound();
  }

  spawnNextRound = () => {
    this.soundManager.playNextRound();
    if (ROUNDS[this.roundIndex].enemy) this.enemies.addEnemies(ROUNDS[this.roundIndex].enemy);
    if (ROUNDS[this.roundIndex].sweepingEnemy) this.enemies.addSweepingEnemies(ROUNDS[this.roundIndex].sweepingEnemy);
    if (ROUNDS[this.roundIndex].sideEnemy) this.enemies.addSideEnemies(ROUNDS[this.roundIndex].sideEnemy);
    if (ROUNDS[this.roundIndex].slowAsteroid) this.asteroids.addSlowAsteroids(ROUNDS[this.roundIndex].slowAsteroid);
    if (ROUNDS[this.roundIndex].fastAsteroid) this.asteroids.addFastAsteroids(ROUNDS[this.roundIndex].fastAsteroid);
    if (ROUNDS[this.roundIndex].extraLife)this.pickups.addExtraLife(ROUNDS[this.roundIndex].extraLife);
    if (ROUNDS[this.roundIndex].powerUp) this.pickups.addPowerUp(ROUNDS[this.roundIndex].powerUp);
  }

  countForNextRound = () => {
    if (!this.nextRound) return;
    this.roundLimit-- 
    if (this.roundLimit <= 0) {
      this.roundLimit = 200;
      this.nextRound = false;
      this.roundIndex++;
      this.spawnNextRound();
    }
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

    if (!this.gameStarted) {
      this.spawnNextRound();
      this.gameStarted = true;
    }

    this.particleEmitters.tick(deltaTime)
    this.bullets.tick(deltaTime)
    this.enemies.tick(deltaTime)
    this.asteroids.tick(deltaTime)
    this.pickups.tick(deltaTime)
    this.player.tick(deltaTime)
    this.hud.tick(deltaTime)
    this.gameOver.tick(deltaTime)
    this.checkForRespawn();
    this.checkForNextRound()
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
