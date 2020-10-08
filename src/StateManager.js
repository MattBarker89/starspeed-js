import { STATES } from './constants.js'
import Score from './Score.js'
export default class StateManager {

  systemState;
  menuState;
  gameState;
  score; 

  constructor() {
    this.systemState = STATES.system.menu
    this.menuState = STATES.menu.main
    this.gameState = STATES.game.level1
    this.score = new Score();
  }
  
}




