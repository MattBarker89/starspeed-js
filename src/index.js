import InputManager from './InputManager.js';
import { SCREEN } from './constants.js'
import GameController from './GameController.js'
import ResourceManager from './ResourceManager.js';
import SoundManager from './SoundManager.js';
import StateManager from './StateManager.js';
import Menu from './Menu.js';
import StarField from './StarField.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

window.stateManager = new StateManager();
window.inputManager = new InputManager();
window.resourceManager = new ResourceManager();
window.soundManager = new SoundManager();
window.gameController = new GameController();

const starField = new StarField();
const menu = new Menu();
const gameController = window.gameController;

let lastTime = 0;

const clearScreen = (ctx) => {
  ctx.clearRect(0, 0, SCREEN.size.width, SCREEN.size.height)
}

const tick = (deltaTime) => {
  starField.tick(deltaTime);
  menu.tick(deltaTime);
  gameController.tick(deltaTime);
}

const render = (ctx) => {
  starField.render(ctx)
  menu.render(ctx);
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

resourceManager.loadSprites();
resourceManager.onReady(gameLoop)


