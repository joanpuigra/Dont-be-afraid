import kaboom from 'kaboom'

// #region Initialize Kaboom
const k = kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  debugKey: 'f1',
  clearColor: [0, 0, 0, 1],
})
// #endregion

// #region Init settings
setGravity(1200)
// k.camIgnore(['ui'])
const SPEED = 320
// #endregion

// #region Load Assets
const loadSprites = () => {
  k.loadSprite('background', 'assets/background.png')
  k.loadSprite('player', 'assets/sprites/player/idle/Idle_1.png')
  k.loadSprite('Ground_1', 'assets/sprites/tileset/Ground_1.png')
  k.loadSprite('Ground_2', 'assets/sprites/tileset/Ground_2.png')
  k.loadSprite('Ground_3', 'assets/sprites/tileset/Ground_3.png')
}

const loadSounds = () => {
  k.loadSound('music', 'assets/sounds/music.mp3')
}
// #endregion

// #region Map
const levels = [
  [
    ' @                ',
    '<==============================================================================================================================================================================================================================================>',
  ],
  ['  @                ', '<=>'],
]

// Scene
k.scene('main', () => {
  // Load assets
  loadSprites()
  loadSounds()

  // TODO: Resize background
  // Add assets
  add([k.sprite('background'), k.pos(0, 0), scale(0.38), 'bg'])
  const bg = k.get('bg')[0]
  // bg.scale(k.width() / bg.width, k.height / bg.height)

  // Play music
  k.play('music', { loop: true })

  // Add level
  const level = addLevel(levels[0], {
    tileWidth: 128,
    tileHeight: 128,
    pos: vec2(30, 30),
    tiles: {
      '<': () => [
        sprite('Ground_1'),
        pos(0, 200),
        area(),
        body({ isStatic: true }),
        'ground',
      ],
      '=': () => [
        sprite('Ground_2'),
        pos(0, 200),
        area(),
        body({ isStatic: true }),
        'ground',
      ],
      '>': () => [
        sprite('Ground_3'),
        pos(0, 200),
        area(),
        body({ isStatic: true }),
        'ground',
      ],
      '@': () => [
        sprite('player'),
        pos(20, 250),
        scale(0.2),
        area(),
        body(),
        health(3),
        'player',
      ],
    },
  })

  const player = level.get('player')[0]

  // Camera position
  player.onUpdate(() => {
    camPos(player.worldPos())
    k.camScale(1.2)
    bg.pos.x = player.pos.x - 250
    bg.pos.y = player.pos.y - 250
  })

  // Controls
  k.onKeyDown('left', () => {
    player.move(-SPEED, 0)
    k.debug.log('left')
  })
  k.onKeyDown('a', () => {
    player.move(-SPEED, 0)
    k.debug.log('a')
  })
  k.onKeyDown('right', () => {
    player.move(SPEED, 0)
    k.debug.log('right')
  })
  k.onKeyDown('d', () => {
    player.move(SPEED, 0)
    k.debug.log('d')
  })
  // k.onKeyPress('space', () => {
  //   if (player.grounded()) {
  //     player.jump()
  //   }
  // })
})

k.go('main')
