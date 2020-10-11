export default class HighScores {

  highScores = []

  constructor() {
    return new Promise(async (resolve) => {
      await this.getHighScores();
      resolve(this);
    });
    
  }

  getHighScores = async () => {
    this.highScores = await (await fetch('http://localhost:3000/highscores')).json();
  }


  postHighScore = async () => {

  }

}
