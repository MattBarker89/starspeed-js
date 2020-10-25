import InputManager from './InputManager.js';
import { SCREEN } from './constants.js'
import GameController from './GameController.js'
import ResourceManager from './ResourceManager.js';
import SoundManager from './SoundManager.js';
import MusicManager from './MusicManager.js'
import StateManager from './StateManager.js';
import Menu from './Menu.js';
import Pause from './Pause.js';
import StarField from './StarField.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

window.stateManager = new StateManager();
window.inputManager = new InputManager();
window.resourceManager = new ResourceManager();
window.soundManager = new SoundManager();
window.musicManager = new MusicManager();
window.gameController = new GameController();

const starField = new StarField();
const menu = new Menu();
const pause = new Pause();
const gameController = window.gameController;

let gameStarted = false;
let lastTime = 0;

const clearScreen = (ctx) => {
  ctx.clearRect(0, 0, SCREEN.size.width, SCREEN.size.height)
}

const tick = (deltaTime) => {
  starField.tick(deltaTime);
  menu.tick(deltaTime);
  pause.tick(deltaTime);
  gameController.tick(deltaTime);
}

const render = (ctx) => {
  starField.render(ctx)
  menu.render(ctx);
  pause.render(ctx);
  gameController.render(ctx);
}

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  tick(deltaTime);
  clearScreen(ctx)
  render(ctx);
  requestAnimationFrame(gameLoop);
}

const initGameLoop = () => {
  gameLoop()
}

const start = () => {
  musicManager.onReady(soundManager.loadSounds);
  resourceManager.onReady(initGameLoop)
  soundManager.onReady(resourceManager.loadSprites);
  musicManager.loadMusic();
}

canvas.addEventListener('click', () => {
  if(! gameStarted ) {
    start();
    gameStarted = true;
  }
}, false);
