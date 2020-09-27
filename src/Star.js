import GameObject from './GameObject.js';
import { SCREEN } from './constants.js'
import { randomIntBetween } from './utilities.js'

export default class Star extends GameObject{



  constructor() {
    super();

    this.pos.x = randomIntBetween(0, SCREEN.size.width)
    this.pos.y = randomIntBetween(0, SCREEN.size.height)
    this.speed = randomIntBetween(5, 9);
    this.size.width = this.speed / 3 ;
    this.size.height = this.speed / 3;

  }

  tick(deltaTime) {
    this.move();
  
  } 

  render(ctx) {
    ctx.fillStyle = "WHITE";
    ctx.beginPath();
    ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  move() {
    this.pos.y += this.speed
    if (this.pos.y >= SCREEN.size.height) {
      this.resetPosition(); 
    } 
  }

  resetPosition() {
    this.pos.x = randomIntBetween(0, SCREEN.size.width)
    this.pos.y = randomIntBetween(0 - SCREEN.size.height,0)
    this.speed = randomIntBetween(5, 9);
    this.size.width = this.speed / 3 ;
    this.size.height = this.speed / 3;
  }

}


