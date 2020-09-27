import InputManager from './InputManager.js';
import { SCREEN, SPRITE_PATHS } from './constants.js'
import StarField from './StarField.js';
import ResourceManager from './ResourceManager.js';
import Player from './Player.js';
import StateManager from './StateManager.js';
import Menu from './Menu.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

window.stateManager = new StateManager();
window.inputManager = new InputManager();
window.resourceManager = new ResourceManager();

let gameObjects = [ 
  new Menu(),
  new StarField(), 
  new Player(),
];

let lastTime = 0;

const clearScreen = (ctx) => {
  ctx.clearRect(0, 0, SCREEN.size.width, SCREEN.size.height)
}

const tick = (deltaTime) => {
  gameObjects.forEach((o) => o.tick(deltaTime));
}

const render = (ctx) => {
  gameObjects.forEach((o) => o.render(ctx));
}

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  tick(deltaTime);
  clearScreen(ctx)
  render(ctx);
  requestAnimationFrame(gameLoop);
}

resourceManager.loadSprites(SPRITE_PATHS);
resourceManager.onReady(gameLoop);