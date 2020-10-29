import GameObject from './GameObject.js';
import { STATES, SCREEN } from './constants.js'

export default class Hud extends GameObject{

  inputManager = window.inputManager;
  stateManager = window.stateManager;
  musicManager = window.musicManager;

  playingMusic

  playerLives;
  score
  shotsFired;
  shotsHit;
  accuracy;

  constructor(gameController) {
    super();
    this.gameController = gameController;
    this.playerLives = this.stateManager.playerLives;
    this.score = this.stateManager.score.currentScore;
    this.shotsFired = this.stateManager.score.shotsFired;
    this.shotsHit = this.stateManager.score.shotsHit;
    this.accuracy = this.stateManager.score.accuracy;
    this.playingMusic = false;
  }

  startMusicIfNotPlaying = () => {
    if (this.playingMusic) return;
    window.musicManager.playGameMusic()
    this.playingMusic = true;
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.startMusicIfNotPlaying();
    this.playerLives = this.stateManager.playerLives;
    this.score = this.stateManager.score.currentScore;
    this.score = this.stateManager.score.currentScore;
    this.shotsFired = this.stateManager.score.shotsFired;
    this.shotsHit = this.stateManager.score.shotsHit;
    this.accuracy = this.stateManager.score.accuracy;
  } 

  render(ctx) {
    if (!this.correctState()) return;
    ctx.beginPath();
    ctx.font = "18px arcade";
    ctx.fillStyle = "WHITE";
    ctx.fillText(`Score: ${this.score}`,  32, 32);
    ctx.fillText(`Round: ${this.gameController.roundIndex + 1}`, 32, 55)
    ctx.fillText(`Lives: ${this.playerLives}`,SCREEN.size.width - 126, 32);
    // ctx.fillText(`Shots Fired: ${this.shotsFired}`, 32, 55);
    // ctx.fillText(`Shots Hit: ${this.shotsHit}`, 32, 76);
    // ctx.fillText(`Accuracy: ${this.accuracy}%`, 32, 99);
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


