import { STATES, KEYS } from './constants.js';

export default class InputManager {

  stateManager = window.stateManager;

  keyDowns = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    escape: false,
    forwardSlash: false,
  };

  acknowledged = {
    escape: false
  } 

  constructor() {
    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);
  }

  keyDown = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
      case KEYS.up:
        this.keyDowns.up = true;
      break;
      case KEYS.down:
        this.keyDowns.down = true;
      break;
      case KEYS.left:
        this.keyDowns.left = true;
      break;
      case KEYS.right:
        this.keyDowns.right = true;
      break;
      case KEYS.space:
        this.keyDowns.space = true;
        break;
      case KEYS.enter:
        this.keyDowns.enter = true;
          break;
      case KEYS.escape:
          if (this.keyDowns.escape) return;
          this.keyDowns.escape = true;
          break;
      case KEYS.forwardSlash:
        this.keyDowns.forwardSlash = true;
        break;
      default:
        break;
    }
  }

  keyUp = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
      case KEYS.up:
        this.keyDowns.up = false;
      break;
      case KEYS.down:
        this.keyDowns.down = false;
      break;
      case KEYS.left:
        this.keyDowns.left = false;
      break;
      case KEYS.right:
        this.keyDowns.right = false;
      break;
      case KEYS.space:
        this.keyDowns.space = false; 
        break;
      case KEYS.enter:
        this.keyDowns.enter = false;
          this.stateManager.systemState = STATES.system.game; 
          break;
      case KEYS.escape:
          this.keyDowns.escape = false;
          this.acknowledged.escape = false;
          break;
      case KEYS.forwardSlash:
        this.keyDowns.forwardSlash = false;
          break;
      default:
        break;
    }
  }
  
}


