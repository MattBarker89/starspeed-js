import { STATES } from './constants.js'
import Score from './Score.js'
import HighScores from './HighScores.js'
export default class StateManager {

  systemState;
  menuState;
  gameState;
  score;
  highScores;
  currentHighScores;
  playerlives;

  constructor() {
    this.systemState = STATES.system.menu
    this.menuState = STATES.menu.main
    this.gameState = STATES.game.level1
    this.score = new Score();
    this.highScores = new HighScores();
    this.currentHighScores = [];
    this.playerLives = 1;
  }

  resetStates = () => {
    this.systemState = STATES.system.game
    this.menuState = STATES.menu.main
    this.gameState = STATES.game.level1
    this.score = new Score();
    this.highScores = new HighScores();
    this.currentHighScores = [];
    this.playerLives = 3;
  }
  
}




