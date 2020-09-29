import GameObject from './GameObject.js'
import { STATES } from './constants.js'
import PlayerBullet from './PlayerBullet.js';
export default class StarField extends GameObject {

  physics = window.physics;
  stateManager = window.stateManager;

  gameController
  playerBullets = [];

  constructor(gameController) {
    super();
    this.playerBullets = []
    this.gameController = gameController
  }

  tick(deltaTime) {
    if (!this.correctState()) return;
    this.playerBullets.forEach((bullet) => bullet.tick(deltaTime))
    this.removeBullets();
  }

  render(ctx) {
    if (!this.correctState()) return;
    this.playerBullets.forEach((bullet) => bullet.render(ctx))

  }

  addPlayerBullet = (x,y) => {
    this.playerBullets.push(new PlayerBullet(x,y));
  }

  removePlayerBullet = (id) => {
    this.playerBullets = this.playerBullets.filter(b => b.id !== id);   
  }

  removeBullets = () => {
    this.playerBullets = this.playerBullets.filter(b => b.pos.y >= 0 );
  }

  correctState() {
    return (
      this.stateManager.systemState === STATES.system.game
      )
  }
  

}
