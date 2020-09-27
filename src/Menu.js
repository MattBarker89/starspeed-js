import GameObject from './GameObject.js'
import { STATES, SCREEN } from './constants.js'
export default class StarField extends GameObject {

  stateManager = window.stateManager;
  resourceManager = window.resourceManager;

  logoToggled = false;
  logoTimeout = 5000;

  constructor() {
    super();
    this.pos.x = -1000;
    this.toggleLogo();
  }

  toggleLogo(){
    setTimeout( () => { this.logoToggled = true }, this.logoTimeout )
  }

  tick(deltaTime) {
    
    if (!this.correctState()) return;
    if( this.logoToggled && this.pos.x < 80 )this.pos.x += 16 ;

  }

  render(ctx) {
    if (!this.correctState()) return;
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    //ctx.fillRect(0, 0, SCREEN.size.width, SCREEN.size.height);
    ctx.drawImage(this.resourceManager.get('./logo.png'), this.pos.x, 64);
    ctx.font = "20px Arial";
    ctx.fillStyle = "WHITE";
    // ctx.fillText("Start", 32 + SCREEN.size.width / 2 - 64, 256 );
    // ctx.fillText("Options", 32  + SCREEN.size.width / 2 - 64, 320 );
    // ctx.fillText("Credits", 32 + SCREEN.size.width / 2 - 64, 384 );
    ctx.beginPath();
    ctx.fill();
    ctx.stroke();
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.menu
      )
  }
  

}
