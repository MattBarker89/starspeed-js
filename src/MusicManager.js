import { MUSIC_PATHS } from './constants.js';

export default class MusicManger {

  musicEnabled;

  musicTracks = [];
  pendingLoading = [];
  callback;

  constructor(){
    this.musicEnabled = true;
  }

  onReady = (func) => {
    this.callBack = func 
  }

  checkAllMusicHaveLoaded = () => {
    if (this.pendingLoading.length) return;
    this.callBack();
  }

  loadMusic = () => {
    MUSIC_PATHS.forEach((music) => {
      this.pendingLoading.push(music.path);
      const audio = new Audio(music.path);
      this.musicTracks.push({
        name: music.name,
        audio
      })
      audio.addEventListener('canplaythrough', () => {
        const match = this.pendingLoading.find(path => path === music.path);
        if (match) {
          this.pendingLoading = this.pendingLoading.filter(path => path !== music.path);
          this.checkAllMusicHaveLoaded();   
        }
      });
    });
  }

  stopAllMusic = () => {
    if (!this.musicEnabled) return;
    this.musicTracks.forEach((m) =>  {
      m.audio.pause();
      m.audio.currenTime = 0;
    })
  }

  playMenuMusic = () => {
    if (!this.musicEnabled) return;
    this.stopAllMusic();
    const music = this.musicTracks.find((m) =>  m.name === 'menu').audio;
    music.play()
    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
  }

  playGameMusic = () => {
    if (!this.musicEnabled) return;
    this.stopAllMusic();
    const music = this.musicTracks.find((m) =>  m.name === 'game').audio;
    music.play()
    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
  }

  pauseGameMusic = () => {
    if (!this.musicEnabled) return;
    this.musicTracks.find((m) =>  m.name === 'game').audio.pause();  
  }

  unPauseGameMusic = () => {
    if (!this.musicEnabled) return;
    this.musicTracks.find((m) =>  m.name === 'game').audio.play(); 
  }

}




