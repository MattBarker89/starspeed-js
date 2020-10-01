export default class GameObject {

  size = { 
    width: 0, 
    height: 0,
  };

  pos = { 
    x:0, 
    y:0,
  };

  constructor() {
    if (this.constructor === Object) throw new Error("Can't instantiate abstract class Gameobject.");
    if (this.tick === undefined) throw new TypeError("Must override method tick.");
    if (this.render === undefined) throw new TypeError("Must override method render.");
    if (this.correctState === undefined) throw new TypeError("Most overide method correct state");
  }
}


