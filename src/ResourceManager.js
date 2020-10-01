import { getKeyByValue } from './utilities.js'
import { SPRITE_PATHS } from './constants.js'
export default class ResourceManager {

  cache = {};
  pendingLoad = [];
  callBack;
  
  loadSprites = () =>  {
    let urls = SPRITE_PATHS
    urls.forEach((url) => {
      let img = new Image();
      this.pendingLoad.push(url);
      img.onload = () => {
        this.cache[url] = img;
        this.pendingLoad = this.pendingLoad.filter(item => item !== url)
        this.checkAllHaveLoaded();
      };
      this.cache[url] = false;
      img.src = url;
    })
  }

  get = (url) => {
    return this.cache[url];
  }

  checkAllHaveLoaded = () => {
    if (this.pendingLoad.length === 0)  {
      this.callBack();
    }
  }

  onReady = (func) => {
    this.callBack = func
  }

}




