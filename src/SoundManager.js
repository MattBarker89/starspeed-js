import { SOUND_PATHS } from './constants.js';

export default class SoundManager {

  soundEnabled;

  sounds = [];
  pendingLoading = [];
  callback;

  constructor(){
    this.soundEnabled = true;
  }

  onReady = (func) => {
    this.callBack = func 
  }

  checkAllSoundsHaveLoaded = () => {
    if (this.pendingLoading.length) return;
    this.callBack();
  }

  loadSounds = () => {
    SOUND_PATHS.forEach( (sound) => {
      this.pendingLoading.push(sound.path);
      const audio = new Audio(sound.path);
      this.sounds.push({
        name: sound.name,
        audio
      })
      audio.addEventListener('canplaythrough', () => {
        const match = this.pendingLoading.find(path => path === sound.path);
        if (match) {
          this.pendingLoading = this.pendingLoading.filter(path => path !== sound.path);
          this.checkAllSoundsHaveLoaded();   
        }
      });
    });
  }

  playShoot = () => {
    if (!this.soundEnabled) return;
    const sound = new Audio('./shoot.wav').play();
    //this.sounds.find((s) =>  s.name === 'shoot').audio.play();  
  }

  playHit = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'hit').audio.play();  
  }

  playDie = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'die').audio.play();  
  }

  playPlayerDie = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'playerDie').audio.play();  
  }

  playPause = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'pause').audio.play();  
  }

  playUnpause = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'unpause').audio.play();  
  }

  playEnemyShoot = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'enemyShoot').audio.play();  
  }

  playShieldUp1 = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'shieldUp1').audio.play();  
  }
  
  playShieldUp2 = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'shieldUp2').audio.play();  
  }
  
  playShieldUp3 = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'shieldUp3').audio.play();  
  }

  playShieldOff = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'shieldOff').audio.play(); 
  }

  playShieldHit = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'shieldHit').audio.play(); 
  }

  playMenuSelect = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'menuSelect').audio.play(); 
  }

  playMenuActivate = () => {
    if (!this.soundEnabled) return;
    this.sounds.find((s) =>  s.name === 'menuActivate').audio.play();
  }
  

}




