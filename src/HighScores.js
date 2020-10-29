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
      let response =  await fetch('https://pure-castle-87739.herokuapp.com/highscores');
      let data = await response.json()
      console.log(data);
      window.stateManager.currentHighScores = data
  }


  postHighScore = async (name, highscore) => {
    console.log(name);
    console.log(highscore)
  }

}
