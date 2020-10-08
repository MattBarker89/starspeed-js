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
    console.log('CURRENT HIGH SCORES');
    this.highScores.forEach((score) => {
      console.log(`NAME: ${score.name}`)
      console.log(`SCORE: ${score.score}`)
      console.log(`---------------------`)
    })
  }


  postHighScore = async () => {

  }

}
