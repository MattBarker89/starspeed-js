import { DEV } from './constants.js'
export default class HighScores {

  stateManager = window.stateManager;
  currentHighScores = []
  hasHighscores = false;

  constructor() {
    return new Promise(async (resolve) => {
      await this.getHighScores();
      resolve(this);
    });
    
  }

  getHighScores = async () => {
    if (DEV) {
      let response =  await fetch('http://localhost:3000/highscores');
      let data = await response.json()
      console.log(data);
      window.stateManager.currentHighScores = data
    }
  }


  postHighScore = async () => {

  }

}
