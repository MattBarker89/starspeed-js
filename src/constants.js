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
  enter: 13,
  escape: 27,
  forwardSlash:191,
});

export const SPRITE_PATHS = Object.freeze([
'./player.png',
'./enemy.png',
'./enemy-damage.png',
'./logo.png',
'./player-bullet.png',
'./enemy-bullet.png',
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
    level1: 0,
    gameOver: 1,
  },
  pauseState:{
    unpaused: 0,
    paused: 1,
  }
})
