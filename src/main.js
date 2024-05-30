import kaboom from 'kaboom'

// #region Initialize Kaboom
const k = kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  debugKey: 'f1',
  clearColor: [0, 0, 0, 1],
  background: [0, 0, 0],
})
// #endregion

// #region Load Assets
const loadSprites = () => {
  k.loadSprite('background', 'assets/background.png')

  // Items
  k.loadSprite('tree', 'assets/sprites/items/Tree.png')
  k.loadSprite('tomb_1', 'assets/sprites/items/Tomb_1.png')
  k.loadSprite('tomb_2', 'assets/sprites/items/Tomb_2.png')
  k.loadSprite('skeleton', 'assets/sprites/items/Skeleton.png')
  k.loadSprite('sign_1', 'assets/sprites/items/Sign_1.png')
  k.loadSprite('sign_2', 'assets/sprites/items/Sign_2.png')
  k.loadSprite('deadBush', 'assets/sprites/items/DeadBush.png')
  k.loadSprite('crate', 'assets/sprites/items/Crate.png')
  k.loadSprite('bush_1', 'assets/sprites/items/Bush_1.png')
  k.loadSprite('bush_2', 'assets/sprites/items/Bush_2.png')

  // Ground
  k.loadSprite('ground_1', 'assets/sprites/tileset/Ground_1.png')
  k.loadSprite('ground_2', 'assets/sprites/tileset/Ground_2.png')
  k.loadSprite('ground_3', 'assets/sprites/tileset/Ground_3.png')
}

// Player
const loadPlayer = () => {
  for (let i = 1; i < 17; i++) {
    k.loadSprite(`player${i}`, `assets/sprites/player/idle/Idle_${i}.png`)
  }

  // k.defineAnimation('idle', {
  //   frames: Array.from({ length: 16 }, (_, i) => `player${i}`),
  // })
}

const loadUI = () => {
  const heart1 = add([fixed(), text('♥️'), color(255, 0, 0), pos(10, 10), 'ui'])
  const heart2 = add([fixed(), text('♥️'), color(255, 0, 0), pos(35, 10), 'ui'])
  const heart3 = add([fixed(), text('♥️'), color(255, 0, 0), pos(60, 10), 'ui'])
}

const loadSounds = () => {
  k.loadSound('music', 'assets/sounds/music.mp3')
}
// #endregion

// #region Map
const levels = [
  [
    ' @kdBsSbr   BtT c                          ',
    '<========> <=====> <===> <==> <===========>',
  ],
  ['  @                ', '<=>'],
]

// Scene
k.scene('main', () => {
  // Init
  const SPEED = 320
  const JUMP = 350
  setGravity(1200)

  // Load assets
  loadSprites()
  loadUI()
  loadPlayer()
  loadSounds()

  // TODO: Resize background
  // Add assets

  // add([k.sprite('background'), k.pos(0, 0), scale(2), 'bg'])
  // const bg = k.get('bg')[0]

  // Play music
  k.play('music', { loop: true })
  volume(0.5)

  // Add level
  const level = addLevel(levels[0], {
    tileWidth: 128,
    tileHeight: 128,
    tiles: {
      '@': () => [
        sprite('player1'),
        pos(30, 250),
        z(10),
        scale(0.2),
        area(),
        body(),
        health(3),
        'player',
      ],
      '<': () => [
        sprite('ground_1'),
        pos(0, 200),
        z(2),
        area(),
        body({ isStatic: true }),
        offscreen({ hide: true }),
        'ground',
      ],
      '=': () => [
        sprite('ground_2'),
        pos(0, 200),
        z(2),
        area(),
        body({ isStatic: true }),
        offscreen({ hide: true }),
        'ground',
      ],
      '>': () => [
        sprite('ground_3'),
        pos(0, 200),
        z(2),
        area(),
        body({ isStatic: true }),
        offscreen({ hide: true }),
        'ground',
      ],
      B: () => [
        sprite('bush_1'),
        pos(0, 240),
        z(0),
        offscreen({ hide: true }),
        'bush',
      ],
      b: () => [
        sprite('bush_2'),
        pos(0, 270),
        z(0),
        offscreen({ hide: true }),
        'bush',
      ],
      d: () => [
        sprite('deadBush'),
        pos(0, 260),
        z(0),
        offscreen({ hide: true }),
        'bush',
      ],
      r: () => [sprite('tree'), pos(0, 90), z(0), 'tree'],
      k: () => [
        sprite('skeleton'),
        pos(0, 280),
        z(1),
        offscreen({ hide: true }),
        'skeleton',
      ],
      s: () => [
        sprite('sign_1'),
        pos(0, 240),
        z(1),
        offscreen({ hide: true }),
        'sign_1',
      ],
      S: () => [
        sprite('sign_2'),
        pos(0, 240),
        z(1),
        offscreen({ hide: true }),
        'sign_2',
      ],
      c: () => [
        sprite('crate'),
        pos(0, 225),
        z(1),
        offscreen({ hide: true }),
        'crate',
      ],
      t: () => [
        sprite('tomb_1'),
        pos(0, 280),
        z(1),
        offscreen({ hide: true }),
        'tomb_1',
      ],
      T: () => [
        sprite('tomb_2'),
        pos(0, 255),
        z(1),
        offscreen({ hide: true }),
        'tomb_2',
      ],
    },
  })

  const player = level.get('player')[0]

  // Player animations
  player.play('idle')

  player.onUpdate(() => {
    camPos(player.worldPos())
    k.camScale(1.2)
    // bg.pos.x = player.pos.x - 250
    // bg.pos.y = player.pos.y - 250
  })

  // # region Controls
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
  k.onKeyPress('space', () => {
    if (player.isGrounded()) {
      player.jump(JUMP)
      k.debug.log('space')
    }
  })
  // #endregion
})

k.go('main')
