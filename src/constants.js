export const SCREEN = Object.freeze({
  size: {
    width: 640,
    height: 640,
  }
})

export const KEYS = Object.freeze({
  up: 87,
  down: 83,
  left: 65,
  right: 68,
  space: 32,
});

export const SPRITE_PATHS = Object.freeze([
'./player.png',
'./logo.png',
]);


export const STATES = Object.freeze({
  system: {
    menu: 0,
    game: 1,
    pause: 2,
  },
  menu: {
    main: 0,
    credits: 1,
    options: 2,
  },
  game:{
    level1: 0
  }

})

