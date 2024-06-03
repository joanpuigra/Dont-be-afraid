import kaboom from 'kaboom'

// #region Initialize Kaboom
const k = kaboom({
  global: false,
  fullscreen: true,

  // Screen
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
  letterbox: true, // Maintain aspect ratio
  scale: 2,

  // Background
  background: [0, 0, 0],
  clearColor: [0, 0, 0, 1],

  // Config
  loadingScreen: true,
  backgroundAudio: true,

  // Debug
  logMax: 8,
  debug: true,
  debugKey: 'f1',
})
// #endregion

//* Game config
const SPEED = 320
const JUMP = 350
k.setGravity(1200)

const colors = {
  magenta: k.rgb(255, 0, 120, 0.5),
  pink: k.rgb(255, 200, 255),
}

const initConfig = () => {
  k.setCursor('default')
}

// #region Load Assets
const loadSprites = () => {
  // Background
  k.loadSprite('menu', 'assets/menu.png')
  k.loadSprite('background', 'assets/bg.png')

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

loadSprites()

const loadSounds = () => {
  k.loadSound('music', 'assets/sounds/music.mp3')
}

loadSounds()
// #endregion

// #region Player Assets
const loadPlayer = () => {
  for (let i = 1; i < 17; i++) {
    k.loadSprite(`player${i}`, `assets/sprites/player/idle/Idle_${i}.png`)
  }

  // k.defineAnimation('idle', {
  //   frames: Array.from({ length: 16 }, (_, i) => `player${i}`),
  // })
}
// #endregion

// #region UI Assets
const loadUI = () => {
  const heart1 = k.add([
    k.fixed(),
    k.text('♥️'),
    k.color(255, 0, 0),
    k.pos(10, 10),
    k.z(100),
    'ui',
  ])
  const heart2 = k.add([
    k.fixed(),
    k.text('♥️'),
    k.color(255, 0, 0),
    k.pos(35, 10),
    k.z(100),
    'ui',
  ])
  const heart3 = k.add([
    k.fixed(),
    k.text('♥️'),
    k.color(255, 0, 0),
    k.pos(60, 10),
    k.z(100),
    'ui',
  ])
}
// #endregion

// #region Add Components
//* Add Button
const addButton = (
  txt,
  pos,
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  action,
) => {
  const btn = k.add([
    k.rect(90, 30, { radius: 10 }),
    k.pos(pos),
    k.color(bgColor),
    k.area(),
    k.scale(1),
    k.anchor('center'),
    k.outline(1, textColor),
  ])

  const btnText = btn.add([
    k.text(txt),
    k.scale(0.4),
    k.anchor('center'),
    k.color(textColor),
  ])

  btnText.add()

  btn.onHoverUpdate(() => {
    btn.color = hoverBgColor
    btnText.color = hoverTextColor
    btn.outline.color = hoverTextColor
    btn.scale = k.vec2(1)
    k.setCursor('pointer')
  })

  btn.onHoverEnd(() => {
    btn.scale = k.vec2(1)
    btn.color = bgColor
    btnText.color = textColor
    btn.outline.color = textColor
    k.setCursor('default')
  })

  btn.onClick(action)
  return btn
}

//* Add Dialog
const addDialog = (txt, pos, width, height, bgColor, textColor) => {
  const dialog = k.add([
    k.rect(width, height, { radius: 10 }),
    k.pos(pos),
    k.color(bgColor),
    k.area(),
    k.scale(0.5),
    k.anchor('center'),
    k.outline(1, textColor),
  ])

  dialog.add([k.text(txt), k.anchor('center'), k.color(textColor)])

  return dialog
}
// #endregion

// #region Create Components
//* Create Buttons
const menu = () => {
  const btnStart = {
    txt: 'START',
    pos: k.vec2(k.width() / 2, k.height() / 2 - 180),
    color: colors.magenta,
    textColor: colors.pink,
    hoverColor: colors.pink,
    hoverTextColor: colors.magenta,
    action: () => {
      k.go('game')
    },
  }

  const btnContinue = {
    txt: 'CONTINUE',
    pos: k.vec2(k.width() / 2, k.height() / 2 - 140),
    color: colors.magenta,
    textColor: colors.pink,
    hoverColor: colors.pink,
    hoverTextColor: colors.magenta,
    action: () => {
      const continueDialog = addDialog(
        'Option not available yet',
        k.vec2(350, 370),
        600,
        100,
        colors.magenta,
        colors.pink,
      )

      continueDialog.add()

      k.wait(3, () => {
        continueDialog.destroy()
      })
    },
  }

  const btnOptions = {
    txt: 'OPTIONS',
    pos: k.vec2(k.width() / 2, k.height() / 2 - 100),
    color: colors.magenta,
    textColor: colors.pink,
    hoverColor: colors.pink,
    hoverTextColor: colors.magenta,
    action: () => {
      const optionsDialog = addDialog(
        'Option not available yet',
        k.vec2(350, 370),
        600,
        100,
        colors.magenta,
        colors.pink,
      )

      optionsDialog.add()

      k.wait(3, () => {
        optionsDialog.destroy()
      })
      // k.go('options')
    },
  }

  const btnExit = {
    txt: 'EXIT',
    pos: k.vec2(k.width() / 2, k.height() / 2 - 60),
    color: colors.magenta,
    textColor: colors.pink,
    hoverColor: colors.pink,
    hoverTextColor: colors.magenta,
    action: () => {
      const exitDialog = addDialog(
        'Even a little girl is more brave than you!',
        k.vec2(350, 370),
        950,
        100,
        colors.magenta,
        colors.pink,
      )

      exitDialog.add()

      k.wait(3, () => {
        exitDialog.destroy()
      })
    },
  }

  addButton(...Object.values(btnStart))
  addButton(...Object.values(btnContinue))
  addButton(...Object.values(btnOptions))
  addButton(...Object.values(btnExit))
}
// #endregion

const title = () => {
  k.add([
    k.text("Don't be"),
    k.pos(k.width() / 2 + 182, 164),
    k.scale(1),
    k.anchor('center'),
    k.color(colors.pink),
  ])
  k.add([
    k.text("Don't be"),
    k.pos(k.width() / 2 + 185, 162),
    k.scale(1),
    k.anchor('center'),
    k.color(colors.magenta),
  ])
  k.add([
    k.text('Afraid'),
    k.pos(k.width() / 2 + 182, 306),
    k.scale(1),
    k.anchor('center'),
    k.color(colors.pink),
  ])
  k.add([
    k.text('Afraid'),
    k.pos(k.width() / 2 + 185, 304),
    k.scale(1),
    k.anchor('center'),
    k.color(colors.magenta),
  ])
}

// #region Scene
k.scene('menu', () => {
  initConfig()
  k.add([k.sprite('menu'), k.pos(0, 200), k.scale(0.5), k.anchor('left')])
  menu()
  title()
  //! FIX: Continue dialog and exit are superposed if used at the same time
})

// #region Map
const levels = [
  [
    ' @kdBsSbr   BtT c                          ',
    '<========> <=====> <===> <==> <===========>',
  ],
  ['  @                ', '<=>'],
]
// #endregion

k.scene('game', () => {
  initConfig()
  loadUI()
  loadPlayer()

  const music = k.play('music', { loop: true, volume: 0.5 })
  k.debug.log('Music playing')
  k.add([k.sprite('background'), k.pos(0, 200), k.scale(0.5), k.anchor('left')])

  // #region Add level
  const level = k.addLevel(levels[0], {
    tileWidth: 128,
    tileHeight: 128,
    tiles: {
      '@': () => [
        k.sprite('player1'),
        k.pos(30, 250),
        k.z(10),
        k.scale(0.2),
        k.area(),
        k.body(),
        k.health(3),
        'player',
      ],
      '<': () => [
        k.sprite('ground_1'),
        k.pos(0, 200),
        k.z(2),
        k.area(),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true }),
        'ground',
      ],
      '=': () => [
        k.sprite('ground_2'),
        k.pos(0, 200),
        k.z(2),
        k.area(),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true }),
        'ground',
      ],
      '>': () => [
        k.sprite('ground_3'),
        k.pos(0, 200),
        k.z(2),
        k.area(),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true }),
        'ground',
      ],
      B: () => [
        k.sprite('bush_1'),
        k.pos(0, 240),
        k.z(0),
        k.offscreen({ hide: true }),
        'bush',
      ],
      b: () => [
        k.sprite('bush_2'),
        k.pos(0, 270),
        k.z(0),
        k.offscreen({ hide: true }),
        'bush',
      ],
      d: () => [
        k.sprite('deadBush'),
        k.pos(0, 260),
        k.z(0),
        k.offscreen({ hide: true }),
        'bush',
      ],
      r: () => [k.sprite('tree'), k.pos(0, 90), k.z(0), 'tree'],
      k: () => [
        k.sprite('skeleton'),
        k.pos(0, 280),
        k.z(1),
        k.offscreen({ hide: true }),
        'skeleton',
      ],
      s: () => [
        k.sprite('sign_1'),
        k.pos(0, 240),
        k.z(1),
        k.offscreen({ hide: true }),
        'sign_1',
      ],
      S: () => [
        k.sprite('sign_2'),
        k.pos(0, 240),
        k.z(1),
        k.offscreen({ hide: true }),
        'sign_2',
      ],
      c: () => [
        k.sprite('crate'),
        k.pos(0, 225),
        k.z(1),
        k.offscreen({ hide: true }),
        'crate',
      ],
      t: () => [
        k.sprite('tomb_1'),
        k.pos(0, 280),
        k.z(1),
        k.offscreen({ hide: true }),
        'tomb_1',
      ],
      T: () => [
        k.sprite('tomb_2'),
        k.pos(0, 255),
        k.z(1),
        k.offscreen({ hide: true }),
        'tomb_2',
      ],
    },
  })
  // #endregion

  const player = level.get('player')[0]
  const ui = k.get('ui')[0]

  // Player animations
  // player.play('idle')

  // #region LightShader
  k.loadShaderURL('light', null, 'assets/shaders/light.frag')

  const effects = {
    light: () => ({
      u_blur: 16,
      u_radius: 16,
      u_resolution: k.vec2(k.width(), k.height()),
      u_mouse: k.mousePos(),
      // u_mouse: player.pos,
    }),
  }
  // #endregion

  k.onUpdate(() => k.usePostEffect('light', effects.light()))

  // Player pos = 158, 237
  //! FIX: Light shader not following player
  //? Attach to player like a 'lantern'

  player.onUpdate(() => {
    k.camPos(player.worldPos())
    k.camScale(1.2)
    // effects.light().u_mouse = player.pos
    // effects.light().u_mouse = player.pos
    // effects.u_mouse.x = player.pos.x
    // effects.u_mouse.y = player.pos.y
    // bg.pos.x = player.pos.x - 250
    // bg.pos.y = player.pos.y - 250
  })

  // #region Controls
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
  k.onKeyDown('escape', () => {
    music.paused = true
    k.usePostEffect(null) //! FIX: Post effect not removed
    k.go('menu')
  })
  // #endregion
})
// #endregion

k.go('menu')
