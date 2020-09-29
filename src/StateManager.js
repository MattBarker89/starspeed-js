import { STATES } from './constants.js'
export default class StateManager {

  systemState;
  menuState;
  gameState;

  constructor() {
    this.systemState = STATES.system.menu
    this.menuState = STATES.menu.main
    this.gameState = STATES.game.level1
  }
  


}




