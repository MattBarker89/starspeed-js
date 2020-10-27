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
'./sweeping-enemy.png',
'./sweeping-enemy-damage.png',
'./side-enemy-left.png',
'./side-enemy-left-damage.png',
'./side-enemy-right.png',
'./side-enemy-right-damage.png',
'./logo.png',
'./player-bullet.png',
'./enemy-bullet.png',
'./enemy-bullet-side.png',
'./powerup.png',
'./extra-life.png',
'./slow-asteroid.png',
'./fast-asteroid.png',
]);

export const SOUND_PATHS = Object.freeze([
  { name: 'shoot', path: './shoot.wav' },
  { name: 'hit', path: './hit.wav' },
  { name: 'die', path: './die.wav' },
  { name: 'enemyShoot', path: './enemy-shoot.wav' },
  { name: 'enemySideShoot', path: './enemy-side-shoot.wav' },
  { name: 'playerDie', path: './player-die.wav' },
  { name: 'pause', path: './pause.wav' },
  { name: 'unpause', path: './unpause.wav' },
  { name: 'shieldUp1', path: './shield-up-1.wav' },
  { name: 'shieldUp2', path: './shield-up-2.wav' },
  { name: 'shieldUp3', path: './shield-up-3.wav' },
  { name: 'shieldOff', path: './shield-off.wav' },
  { name: 'shieldHit', path: './shield-hit.wav' },
  { name: 'menuSelect', path: './menu-select.wav' },
  { name: 'menuActivate', path: './menu-activate.wav' },
  { name: 'powerUp', path: './powerup.wav' },
  { name: 'extraLife', path: './extra-life.wav' },
])

export const MUSIC_PATHS = Object.freeze([
  { name: 'menu', path: './menu-music.mp3' },
  { name: 'game', path: './game-music.mp3' },
])

export const SIDES = Object.freeze({
  left: 0,
  right: 0,
})

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
