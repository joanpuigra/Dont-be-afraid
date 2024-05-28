import kaboom from 'kaboom'

const k = kaboom({})

k.loadSprite('player', 'sprites/player.png')

k.add([k.pos(120, 80), k.sprite('player')])

k.onClick(() => k.addKaboom(k.mousePos()))
