import GameObject from './GameObject.js'
import { STATES, SCREEN, DEV, ALPHABET } from './constants.js'
export default class GameOver extends GameObject {

  soundManager = window.soundManager;
  stateManager = window.stateManager;
  resourceManager = window.resourceManager;
  inputManager = window.inputManager;

  name = ['A', 'B', 'C']
  nameIndexes = [0, 0, 0];
  alphabetIndex = 0;
  selectedLetterIndex = 0;

  gameController;

  constructor(gameController) {
    super();
    this.gameController = gameController
  }

  
  increaseLetter = () => {
    if(this.nameIndexes[this.selectedLetterIndex] + 1 <= ALPHABET.length - 1 ) {
      this.nameIndexes[this.selectedLetterIndex] ++
    } else {
      this.nameIndexes[this.selectedLetterIndex] = 0
    }
    this.name[this.selectedLetterIndex] =  ALPHABET[this.nameIndexes[this.selectedLetterIndex]]
  }

  decreaseLetter = () => {
    if(this.nameIndexes[this.selectedLetterIndex] - 1 > 0) {
      this.nameIndexes[this.selectedLetterIndex] --
    } else {
      this.nameIndexes[this.selectedLetterIndex] = ALPHABET.length - 1
    }
    this.name[this.selectedLetterIndex] =  ALPHABET[this.nameIndexes[this.selectedLetterIndex]]
  }

  increaseIndex = () => {
    this.selectedLetterIndex++ 
    if (this.selectedLetterIndex > this.nameIndexes.length -1 ) this.selectedLetterIndex = 0;
  }

  decreaseIndex = () => {
    this.selectedLetterIndex-- 
    if (this.selectedLetterIndex < 0  ) this.selectedLetterIndex = this.nameIndexes.length - 1;
  }

  submitHighScore = () => {
    console.log(this.stateManager)
    fetch('https://pure-castle-87739.herokuapp.com/highscore', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name: this.name.join(''),
        score: this.stateManager.score.currentScore
      })
    }).then(() => {
        window.location.reload()
      });
  }

  checkUpKey = () => {
    if(this.inputManager.keyDowns.up && !this.inputManager.acknowledged.up) {
      this.inputManager.acknowledged.up = true;
      this.increaseLetter();
    }
  }

  checkDownKey = () => {
    if(this.inputManager.keyDowns.down && !this.inputManager.acknowledged.down) {
      this.inputManager.acknowledged.down = true;
      this.decreaseLetter();
    }
  }

  checkLeftKey = () => {
    if(this.inputManager.keyDowns.left && !this.inputManager.acknowledged.left) {
      this.inputManager.acknowledged.left = true;
      this.decreaseIndex();
    }
  }

  checkRightKey = () => {
    if(this.inputManager.keyDowns.right && !this.inputManager.acknowledged.right) {
      this.inputManager.acknowledged.right = true;
      this.increaseIndex();
    }
  }

  checkEnterKey = () => {
    if(this.inputManager.keyDowns.enter && !this.inputManager.acknowledged.enter) {
      this.inputManager.acknowledged.enter = true;
      this.submitHighScore();
    }
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.checkUpKey();
    this.checkDownKey();
    this.checkLeftKey();
    this.checkRightKey();
    this.checkEnterKey();
  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.fillRect(0, 0, SCREEN.size.width, SCREEN.size.height);
    ctx.font = "32px arcade";

    ctx.fillStyle = "#36bbf5";
    ctx.fillText(`SCORE: ${this.stateManager.score.currentScore}`, 248,256)

    this.name.forEach((letter, index) => {
      if (index === this.selectedLetterIndex) {
        ctx.fillStyle = "#36bbf5";
      } else {
        ctx.fillStyle = "WHITE";
      }
      ctx.fillText(`${letter}`, 286 + 32 * index + 1 , 312);
    })

    ctx.fillStyle = "WHITE";
    ctx.fillText('[ENTER] TO SAVE' , 162, 412);

    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState == STATES.system.game && 
      this.stateManager.gameState === STATES.game.gameOver &&
      this.stateManager.menuState === STATES.menu.savingHighScore
      )
  }

}
