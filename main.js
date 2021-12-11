//states: menu, fade, showS1, hideS1, showS2, hideS2 ... showS5, hideS5, => end

var timer = 3
var gamestate = 'menu'
var gamenum = 1
var Tr = 0
var diaTr = 0
var letters = []
var done = false
var ie2 = 0
var limit = 0
var colors = []
var timer2 = 0.5
var abc = 0
var heat = 2
var dia = 1
var dia2 = false
var start = true
var rec, col, laz, mirB, mir, wal, gal, dGal, div, mer, chek
var on = []
var moving = false
var oMoving = false
var PX = 0
var PY = 0
var oMov = null
var pd = 0 //1 : up   2 : right   3 : down   4 : left
var nes = []
var lSpeed = 6
var mirC = []
var timer5 = 0.3
var juice = []
var h = 0;
var size
var player,playerimg

var grid = [[  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ]]

var lazers = []
var lazerCol = []

function preload() {
  ship1 = loadImage('ship1.png')
  ship2 = loadImage('ship2.png')
  ship3 = loadImage('ship3.png')
  ship4 = loadImage('ship4.png')
  ship5 = loadImage('ship5.png')

  bg1 = loadImage('bg1.jpeg')
  logoimg = loadImage("logo.gif")
  spaceimg = loadImage("space.gif")
  popupimg = loadImage("popup.png")

  lazers = loadImage('ship1.png')
  mirror = loadImage('ship1.png')
  collector = loadImage('ship1.png')
  end = loadImage('ship1.png')
  wall = loadImage('ship1.png')
  merger = loadImage('ship1.png')
  diverger = loadImage('ship1.png')

  playerimg=loadAnimation("Player/w1.png","Player/w2.png","Player/w3.png","Player/w4.png","Player/w5.png","Player/w6.png","Player/w7.png","Player/w8.png","Player/w9.png","Player/w10.png","Player/w11.png","Player/w12.png","Player/w13.png","Player/w14.png","Player/w15.png","Player/w16.png","Player/w17.png","Player/w18.png")

}

function setup() {
  createCanvas(800, 800);


  createCanvas(windowWidth, windowHeight)
  timer = millis()

  logo = createSprite()
  logo.addImage(logoimg)

  popup = createSprite(windowWidth / 2, windowHeight / 2)
  popup.addImage(popupimg)
  popup.visible = false
  popup.scale = 1.5

  logo.visible = false


  playbutton = createImg("play.png")
  playbutton.position(windowWidth - 150, windowHeight / 2 - 100)
  playbutton.size(100, 100)

  homebutton = createImg("home.png")
  homebutton.position(50, 200)
  homebutton.size(100, 100)

  aboutbutton = createImg("about.png")
  aboutbutton.position(50, 300)
  aboutbutton.size(100, 100)

  soundbutton = createImg("sound.png")
  soundbutton.position(50, 50)
  soundbutton.size(100, 100)

  nosoundbutton = createImg("nosound.png")
  nosoundbutton.position(50, 50)
  nosoundbutton.size(100, 100)

  nosoundbutton.hide()


  //making grid

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      grid[x][y].push(130 + 60 * x)
      grid[x][y].push(180 + 60 * y)
      grid[x][y].push('empty')
      grid[x][y].push('empty')
      grid[x][y].push(undefined)
      grid[x][y].push(undefined)
    }
  }




  player = createSprite(130, 180, 30, 30)
  player.shapeColor = 'lime'
player.addAnimation("walk",playerimg)
  player.visible = 0



  walls = createGroup()


  rec = createGroup()
  col = createGroup()
  laz = createGroup()
  mirB = createGroup()
  mir = createGroup()
  wal = createGroup()
  gal = createGroup()
  dGal = createGroup()
  chek = createGroup()
  div = createGroup()
  mer = createGroup()


  if(windowHeight < windowWidth){
    size = windowHeight
  } else {
    size = windowWidth 
  }

  grid[0][0][2] = player
}

function draw() {

  timer5 -= 0.1
  background(spaceimg)

  for (let i = 0; i < lazers.length; i++) {

    if (!lazers[i][0][4]) {

      lazers.splice(i, 1)
    }
  }

  if (gamestate !== 'menu' && gamestate !== 'fade' && gamestate !== 'Gfade') {
    if (keyDown('a') && moving === false && PX !== 0) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX - 1][PY][4] === 'mirror') {
            if (grid[PX - 1][PY][5] === 1) {
              setRotation(grid[PX - 1][PY][2], 2)
              grid[PX - 1][PY][5] = 2


            } else {
              setRotation(grid[PX - 1][PY][2], 1)
              grid[PX - 1][PY][5] = 1


            }
          }

          else if (grid[PX - 1][PY][5] === 4) {
            setRotation(grid[PX - 1][PY][2], 1)
            grid[PX - 1][PY][5] = 1
          } else {
            setRotation(grid[PX - 1][PY][2], grid[PX - 1][PY][5] + 1)
            grid[PX - 1][PY][5] += 1
          }

        }
      }//sus
      else if (grid[PX - 1][PY][4] === 'finish') {
        finish()

      } else if (keyDown(' ') && PX !== 9 && grid[PX + 1][PY][3] === true && grid[PX - 1][PY][2] === 'empty') {

        pull(4, grid[PX + 1][PY][2])

        move(-1, 0, player)
        pd = 4

        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'


      } else if (grid[PX - 1][PY][3] === true && PX !== 1 && grid[PX - 2][PY][2] === 'empty') {



        shove(4, grid[PX - 1][PY][2])

        move(-1, 0, player)
        pd = 4
        grid[PX][PY][2] = 'empty'
        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX - 1][PY][3] === false) {

      } else if (PX !== 9 && keyDown(' ') && grid[PX + 1][PY][3] === false) {

      } else if (grid[PX - 1][PY][2] === 'empty') {
        move(-1, 0, player)
        pd = 4
        grid[PX][PY][2] = 'empty'
        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }

    }
    if (keyDown('d') && moving === false && PX !== 9) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX + 1][PY][4] === 'mirror') {
            if (grid[PX + 1][PY][5] === 1) {
              setRotation(grid[PX + 1][PY][2], 2)
              grid[PX + 1][PY][5] = 2


            } else {
              setRotation(grid[PX + 1][PY][2], 1)
              grid[PX + 1][PY][5] = 1


            }
          }

          else if (grid[PX + 1][PY][5] === 4) {
            setRotation(grid[PX + 1][PY][2], 1)
            grid[PX + 1][PY][5] = 1
          } else {
            setRotation(grid[PX + 1][PY][2], grid[PX + 1][PY][5] + 1)
            grid[PX + 1][PY][5] += 1
          }

        }
      }//sus
      else if (grid[PX + 1][PY][4] === 'finish') {
        finish()

      } else if (keyDown(' ') && PX !== 0 && grid[PX - 1][PY][3] === true && grid[PX + 1][PY][2] === 'empty') {

        pull(2, grid[PX - 1][PY][2])

        move(1, 0, player)
        pd = 2

        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'

      }

      else if (grid[PX + 1][PY][3] === true && PX !== 8 && grid[PX + 2][PY][2] === 'empty') {

        shove(2, grid[PX + 1][PY][2])

        move(1, 0, player)
        pd = 2
        grid[PX][PY][2] = 'empty'
        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX + 1][PY][3] === false) {

      } else if (PX !== 0 && keyDown(' ') && grid[PX - 1][PY][3] === false) {

      } else if (grid[PX + 1][PY][2] === 'empty') {
        move(1, 0, player)
        pd = 2
        grid[PX][PY][2] = 'empty'
        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
    if (keyDown('w') && moving === false && PY !== 0) {


      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX][PY - 1][4] === 'mirror') {
            if (grid[PX][PY - 1][5] === 1) {
              setRotation(grid[PX][PY - 1][2], 2)
              grid[PX][PY - 1][5] = 2


            } else {
              setRotation(grid[PX][PY - 1][2], 1)
              grid[PX][PY - 1][5] = 1


            }
          }

          else if (grid[PX][PY - 1][5] === 4) {

            setRotation(grid[PX][PY - 1][2], 1)
            grid[PX][PY - 1][5] = 1
          } else {

            setRotation(grid[PX][PY - 1][2], grid[PX][PY - 1][5] + 1)
            grid[PX][PY - 1][5] += 1
          }

        }
      }//sus

      else if (grid[PX][PY - 1][4] === 'finish') {

        finish()

      } else if (keyDown(' ') && PY !== 9 && grid[PX][PY + 1][3] === true && grid[PX][PY - 1][2] === 'empty') {

        pull(1, grid[PX][PY + 1][2])

        move(0, -1, player)
        pd = 1

        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'


      } else if (grid[PX][PY - 1][3] === true && PY !== 1 && grid[PX][PY - 2][2] === 'empty') {



        shove(1, grid[PX][PY - 1][2])

        move(0, -1, player)
        pd = 1
        grid[PX][PY][2] = 'empty'
        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY - 1][3] === false) {

      } else if (PY !== 9 && keyDown(' ') && grid[PX][PY + 1][3] === false) {

      } else if (grid[PX][PY - 1][2] === 'empty') {
        move(0, -1, player)
        pd = 1
        grid[PX][PY][2] = 'empty'
        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
    if (keyDown('s') && moving === false && PY !== 9) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX][PY + 1][4] === 'mirror') {
            if (grid[PX][PY + 1][5] === 1) {
              setRotation(grid[PX][PY + 1][2], 2)
              grid[PX][PY + 1][5] = 2


            } else {
              setRotation(grid[PX][PY + 1][2], 1)
              grid[PX][PY + 1][5] = 1


            }
          }

          else if (grid[PX][PY + 1][5] === 4) {
            setRotation(grid[PX][PY + 1][2], 1)
            grid[PX][PY + 1][5] = 1
          } else {
            setRotation(grid[PX][PY + 1][2], grid[PX][PY + 1][5] + 1)
            grid[PX][PY + 1][5] += 1
          }

        }
      }//sus

      else if (grid[PX][PY + 1][4] === 'finish') {
        finish()

      } else if (keyDown(' ') && PY !== 0 && grid[PX][PY - 1][3] === true && grid[PX][PY + 1][2] === 'empty') {

        pull(3, grid[PX][PY - 1][2])

        move(0, 1, player)
        pd = 3

        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY + 1][3] === true && PY !== 8 && grid[PX][PY + 2][2] === 'empty') {





        shove(3, grid[PX][PY + 1][2])

        move(0, 1, player)
        pd = 3
        grid[PX][PY][2] = 'empty'
        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY + 1][3] === false) {

      } else if (PY !== 0 && keyDown(' ') && grid[PX][PY - 1][3] === false) {

      } else if (grid[PX][PY + 1][2] === 'empty') {
        move(0, 1, player)
        pd = 3
        grid[PX][PY][2] = 'empty'
        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
  }

  if (moving === true) {

    if (pd === 1 && player.velocityY < 0) {
      player.velocityY += 0.5


    }
    if (pd === 2 && player.velocityX > 0) {
      player.velocityX -= 0.5

    }
    if (pd === 3 && player.velocityY > 0) {
      player.velocityY -= 0.5

    }
    if (pd === 4 && player.velocityX < 0) {
      player.velocityX += 0.5

    }

    if (player.velocityY === 0 && player.velocityX === 0) {
      moving = false
      pd = 0
    }


  }

  if (oMov !== null || undefined) {

    oMov.velocityY = player.velocityY

    oMov.velocityX = player.velocityX

    if (moving === false) {
      oMov = null
    }


  }

  if (gamestate === 'menu' || gamestate === 'fade' || gamestate === 'fade' | gamestate === 'about') {
    if (gamestate == 'menu') {
      background(spaceimg)
      popup.visible = false
      background(logoimg)

      //sound.setVolume(volume.value())

  }
  if (homebutton.mousePressed(() => {
      gamestate = "menu"
  }))

  if (soundbutton.mousePressed(() => {
      soundbutton.hide()
      nosoundbutton.show()
  }))
  if (nosoundbutton.mousePressed(() => {
      soundbutton.show()
      nosoundbutton.hide()
  }))

      if (aboutbutton.mousePressed(() => {
          gamestate = "about"
      }))


      if (playbutton.mousePressed(() => {
        gamestate = "S1"
        homebutton.hide()
        aboutbutton.hide()
        playbutton.hide()
       
    }))

          if (gamestate === "about") {

              popup.visible = true
          }
  drawSprites()

  }
  if (gamestate === 'fade') {
    rectMode(CORNER)
    fill(0, Tr)
    rect(0, 0, 800, 800)

    Tr += 4

    if (Tr >= 255) {
      gamestate = 'S' + gamenum
      start = true
    }
  }

  switch (dia) {

    case 2: talk('when you are singing a song and; your idiot friend starts singing; too', '?')

      break

    case 3:
      talk('i need too pee sod; your idiot friend starts singing; too', '?')

      break
  }

  if (done === true) {





    for (let i = 0; i <= limit; i++) {
      if (si.length > 0 && letters[i]) {
        letters[i].show()
      }
    }

    timer2--

    if (timer2 <= 0) {
      timer2 = 0.5
      limit++
    }





  }

  if (gamestate === 'S1' || gamestate === 'S2' || gamestate === 'S3' || gamestate === 'S4' || gamestate === 'S5') {
    rectMode(CENTER)

    for (let i = 0; i < mirB.length; i++) {

      mir[i].rotation = getRotation(mirB[i]) * 90 + 45

    }

    h++

    push()
    rectMode(CORNER)
    rect(windowWidth / 2 - size / 10 * 4 , size / 5, size - size / 5 * 2, size - size / 5 * 2)

    for(let i =  size / 5; i <= size - size / 5 * 3; i += (size / 5 * 3)/ 10 ){
      strokeWeight(2)
      stroke(sin(h) * 200 + 100)
      line(windowWidth / 2 - size / 10 * 4 , i, windowWidth / 2 + size / 10 * 4, i)
    }

    for(let i =  windowWidth / 2 - size / 10 * 4; i <= windowWidth / 2 + size / 10 * 4; i += (size / 5 * 3) / 10 ){
      strokeWeight(2)
      stroke(sin(h) * 200 + 100)
      line( i, windowHeight / 2 - size / 10 * 4, i, windowHeight / 2 + size / 10 * 4)
    }
pop()

    player.visible = 1




    drawSprites()
    for (let i = 0; i < lazers.length; i++) {
      lazers[i] = [[lazers[i][0][0], lazers[i][0][1], lazers[i][0][2], lazers[i][0][3], lazers[i][0][4]]]




      start = true

      X = lazers[i][0][0]
      Y = lazers[i][0][1]
      d = lazers[i][0][2]
      c = lazers[i][0][3]
      s = lazers[i][0][4]


      while (start) {



        if (d === 1) {
          Y -= 1
        } else if (d === 2) {
          X += 1
        } else if (d === 3) {
          Y += 1
        } else if (d === 4) {
          X -= 1
        }



        if (X === -1 || X === 10 || Y === -1 || Y === 10 || grid[X][Y][4] == 'wall') {
          start = false

          lazers[i].push([X, Y, d, c, s])

        } else if (grid[X][Y][4] == 'mirror') {

          var mc = mir[mirB.indexOf(grid[X][Y][2])].shapeColor
          var ls = []
          var lp = []


          if (c !== undefined && mc !== undefined) {

            for (let e = 0; e < 3; e++) {

              if (colorD(c)[e] === colorD(mc)[e]) {

                ls.push(colorD(c)[e])
                lp.push('')
              } else if (c !== '') {
                lp.push(colorD(c)[e])
                ls.push('')
              } else {
                ls.push('')
                lp.push('')
              }
            }
          }




          ls = colorM(ls)
          if (colorM(lp) !== []) {
            lp = colorM(lp)
          }




          for (let i = 0; i < lazers.length; i++) {
            for (let e = 0; e < lazers[i].length; e++) {

              if (lazers[i][e][0] === X && lazers[i][e][1] === Y && lazers[i][e][2] === d) {
                if (d === MF(d, grid[X][Y][5])) {
                  if (ls === c && lazers[i][e][3] !== undefined && c !== undefined) {
                    ls = colorMerge(lazers[i][e][3], c)
                  }
                }
                if (lp === c && lazers[i][e][3] !== undefined && c !== undefined) {
                  lp = colorMerge(lazers[i][e][3], c)
                }


              }
            }
          }



          lazers.push([[X, Y, d, lp, false]])

          d = MF(d, grid[X][Y][5])

          lazers[i].push([X, Y, d, ls, s])

          c = ls



        } else if (grid[X][Y][4] == 'col') {
          start = false

          lazers[i].push([X, Y, d, c, s])

        }


        else if (grid[X][Y][4] == 'diverger' && c !== undefined) {
          if (grid[X][Y][5] === d) {
            yed = colorD(c)

            if (yed[0] !== '') {
              if (d !== 4) {
                lazers.push([[X, Y, d + 1, 'red', false]])
                c = 'red'
              } else {
                lazers.push([[X, Y, 1, 'red', false]])
              }
            }

            if (yed[1] !== '') {
              if (d !== 4) {
                lazers.push([[X, Y, d, 'yellow', false]])
                c = 'yellow'
              }
            }

            if (yed[2] !== '') {
              if (d !== 1) {
                lazers.push([[X, Y, d - 1, 'blue', false]])
                c = 'blue'
              } else {
                lazers.push([[X, Y, 4, 'blue', false]])
              }
            }

            lazers[i].push([X, Y, d, c, s])

          } else {
            start = false
            lazers[i].push([X, Y, d, c, s])
          }
          start = false
          lazers[i].push([X, Y, d, c, s])
        }
        else if (grid[X][Y][4] == 'merger' && c !== undefined) {

          start = false
          lazers[i].push([X, Y, d, c, s])

          juice = []

          for (let e = 0; e < mer.length; e++) {
            juice.push([xTX(mer[e].x), yTY(mer[e].y), getRotation(mer[e]), ''])
          }
          //X Y d c s
          for (let i = 0; i < lazers.length; i++) {
            for (let a = 0; a < lazers[i].length; a++) {
              for (let e = 0; e < mer.length; e++) {

                if (xTX(mer[e].x) === lazers[i][a][0] && yTY(mer[e].y) === lazers[i][a][1]) {
                  if (getRotation(mer[e]) === 1 && lazers[i][a][2] === 3) {

                  }
                  else if (getRotation(mer[e]) === 2 && lazers[i][a][2] === 4) {

                  }
                  else if (getRotation(mer[e]) === 3 && lazers[i][a][2] === 1) {

                  }
                  else if (getRotation(mer[e]) === 4 && lazers[i][a][2] === 2) {

                  }
                  else {
                    if (juice[e][3] === '') {
                      juice[e][3] = lazers[i][a][3]
                    } else {
                      juice[e][3] = colorMerge(juice[e][3], lazers[i][a][3])

                    }
                  }
                }
              }
            }
          }

          for (let i = 0; i < juice.length; i++) {
            if (juice[i][3] !== '') {
              lazers.push([[juice[i][0], juice[i][1], juice[i][2], juice[i][3], false]])
            }
          }



        }
        else if (grid[X][Y][4] == 'checkpoint') {
          var dir1 = getRotation(grid[X][Y][2])

          if (dir1 === 1 && d === 1) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 2 && d === 2) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 3 && d === 3) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 4 && d === 4) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 5 && d === 1 || d === 3) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 6 && d === 2 || d === 4) {
            lazers[i].push([X, Y, d, c, s])
          } else {
            start = false
            lazers[i].push([X, Y, d, c, s])
          }

        }
        else if (grid[X][Y][4] == 'glass' || grid[X][Y][4] == 'dGlass') {
          var t = grid[X][Y][4]
          var yes = ''
          var no = ['', '', '']
          yes1 = colorD(c)
          yes2 = colorD(grid[X][Y][2].shapeColor)
          if (yes1 !== undefined && yes2 !== undefined) {
            if (yes2[0] !== '' && yes1[0] !== '') {
              no[0] = yes2[0]
            }
            if (yes2[1] !== '' && yes1[1] !== '') {
              no[1] = yes2[1]
            }
            if (yes2[2] !== '' && yes1[2] !== '') {
              no[2] = yes2[2]
            }
          } else {
            continue
          }
          yes = colorM(no)
          c = yes

          if (t === 'glass') {
            lazers[i].push([X, Y, d, c, s])
          } else {
            var dir = getRotation(grid[X][Y][2])


            if (dir === 1 && d === 1) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 2 && d === 2) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 3 && d === 3) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 4 && d === 4) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 5 && d === 1 || d === 3) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 6 && d === 2 || d === 4) {
              lazers[i].push([X, Y, d, c, s])
            } else {
              start = false
              lazers[i].push([X, Y, d, c, s])
            }
          }


        }







      }//while...




      for (let e = 0; e < lazers[i].length - 1; e++) {

        if (lazers[i][e][3] !== [] && lazers[i][e][3] !== undefined) {

          stroke(lazers[i][e][3])

          strokeWeight(2)
          line(Xx(lazers[i][e][0]), Yy(lazers[i][e][1]), Xx(lazers[i][e + 1][0]), Yy(lazers[i][e + 1][1]))
        }
      }

      loop1:
      for (let e = 0; e < col.length; e++) {
        for (let i = 0; i < lazers.length; i++) {
          for (let x = 0; x < lazers[i].length; x++) {

            X = xTX(col[e].x)
            Y = yTY(col[e].y)
            d = getRotation(col[e])
            ct = false


            if (grid[X][Y][4] === 'col') {
              lX = lazers[i][lazers[i].length - 1][0]
              lY = lazers[i][lazers[i].length - 1][1]
              lD = lazers[i][lazers[i].length - 1][2]
              lC = colorD(lazers[i][lazers[i].length - 1][3])
            } else {

              lC = colorD(lazers[i][x][3])
              lX = lazers[i][x][0]
              lY = lazers[i][x][1]
              lD = lazers[i][x][2]
            }
            c = colorD(col[e].shapeColor)

            if (lC !== undefined && c !== undefined) {
              for (let x = 0; x < c.length; x++) {
                if (c[x] === '') {
                  continue
                } else if (lC[x] === c[x]) {
                  ct = true
                } else {
                  ct = false
                  break
                }
              }
            } else {
              ct = false
            }

            if (X === lX && Y === lY && d === lD && ct) {
              on[e] = true
              continue loop1
            } else {
              on[e] = false
            }
          }
        }
      }



    }







  } // everythang

  if (gamestate === 'S1') {

    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWheheWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW



    if (start === true) {
      mirC = []

      
      makeBox(0, 4, false, 'lazer', 2, 'red')
      
      makeBox(4, 5, true, 'mirror', 2, 'red')
      
      makeBox(4, 0, false, 'col', 1, 'red')
      
      makeBox(9, 0, false, 'finish', null)
      


      nes.push(0)


      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = mirC[i]

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)


    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }



    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Lazer, Mirror, Colector, done

  if (gamestate === 'S2') {

    if (start === true) {

      mirC = []

      makeBox(4, 9, false, 'lazer', 1, 'blue')

      makeBox(0, 4, false, 'lazer', 2, 'red')

      makeBox(3, 3, true, 'mirror', 2, 'white')

      makeBox(4, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)



      nes.push(0)
      nes.push(1)

      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = mirC[i]

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Color, done

  if (gamestate === 'S3') {

    if (start === true) {


      mirC = []


      makeBox(0, 4, false, 'lazer', 2, 'purple')

      makeBox(4, 3, true, 'mirror', 2, 'red')


      makeBox(5, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)



      nes.push(0)
      nes.push(1)

      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = mirC[i]

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Tinted Mirror

  if (gamestate === 'S4') {

    if (start === true) {

      mirC = []

      makeBox(0, 2, false, 'lazer', 2, 'orange')
      makeBox(0, 4, false, 'lazer', 2, 'yellow')
      makeBox(6, 0, false, 'lazer', 3, 'blue')
      makeBox(2, 3, true, 'diverger', 1, 'yellow')

      makeBox(0, 9, true, 'merger', 1, 'yellow')

      makeBox(0, 6, false, 'col', 4, 'red')
      makeBox(3, 9, false, 'col', 3, 'yellow')
      makeBox(6, 9, false, 'col', 3, 'green')
      makeBox(3, 5, true, 'mirror', 2, 'white')

      makeBox(9, 9, false, 'finish', 2, 'yellow')







      nes.push(0)


      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = mirC[i]

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Merger, Glass

  if (gamestate === 'S5') {

    if (start === true) {

      mirC = []

      makeBox(2, 0, true, 'mirror', 1, 'red')
      makeBox(1, 3, true, 'mirror', 2, 'red')
      makeBox(9, 2, true, 'mirror', 2, 'red')
      makeBox(0, 4, true, 'mirror', 2, 'red')
      makeBox(3, 6, true, 'mirror', 1, 'yellow')
      makeBox(3, 8, true, 'mirror', 1, 'blue')
      makeBox(6, 6, true, 'mirror', 2, 'yellow')


      makeBox(2, 1, false, 'lazer', 4, 'red')
      makeBox(7, 4, false, 'lazer', 3, 'red')
      makeBox(9, 0, false, 'lazer', 4, 'red')
      makeBox(9, 0, false, 'lazer', 4, 'red')
      makeBox(0, 9, false, 'lazer', 1, 'yellow')
      makeBox(9, 6, false, 'lazer', 4, 'blue')


      makeBox(3, 1, false, 'wall', 4, 'blue')
      makeBox(1, 3, false, 'wall', 4, 'blue')
      makeBox(2, 3, false, 'wall', 4, 'blue')

      makeBox(9, 3, false, 'wall', 4, 'blue')
      makeBox(8, 3, false, 'wall', 4, 'blue')
      makeBox(7, 3, false, 'wall', 4, 'blue')
      makeBox(8, 1, false, 'wall', 4, 'blue')
      makeBox(9, 1, false, 'wall', 4, 'blue')

      makeBox(0, 3, false, 'col', 3, 'red')
      makeBox(7, 1, false, 'col', 3, 'red')
      makeBox(4, 9, false, 'col', 3, 'green')
      makeBox(9, 9, false, 'col', 2, 'red')
      makeBox(1, 4, false, 'checkpoint', 6, 'yellow')

      makeBox(9, 4, false, 'finish', 1, 'yellow')





      nes.push(0)
      nes.push(1)

      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = mirC[i]

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)



  } // Splitter, Wall, Checkpoint

  if (gamestate === 'S6') {
    textAlign(CENTER)
    textSize(100)
    fill('black')
    text('You Win!', 400, 400)
  }

  if (gamestate === 'Gfade') {
    fill(0, Tr)
    rect(0, 0, 800, 800)

    Tr += 15

    if (Tr >= 255) {
      gamestate = 'S' + gamenum
      start = true
    }
  }

  if (gamestate === 'end') {

    if (start === true) {



      makeBox(4, 9, false, 'lazer', 1, 'blue')

      makeBox(0, 4, false, 'lazer', 2, 'red')

      makeBox(3, 3, true, 'mirror', 2)

      makeBox(4, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)



      nes.push(0)
      nes.push(1)

      for (let i = 0; i < mirB.length; i++) {

        mir.add(createSprite(20, 20, 3, 40))
        mir[i].shapeColor = 'lightblue'

        mir[i].rotation = getRotation(mirB[i]) * 90 + 45

      }



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    for (let i = 0; i < mirB.length; i++) {

      mir[i].x = mirB[i].x
      mir[i].y = mirB[i].y

    }

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // play 2

  {

    noStroke() //balls
    for (let i = 0; i < mer.length; i++) {
      d = getRotation(mer[i])
      p = mer[i]

      if (d === 1) {

        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 2, p.y - 15, 2, 20)
        fill('yellow')
        rect(p.x, p.y - 15, 2, 20)
        fill('blue')
        rect(p.x + 2, p.y - 15, 2, 20)

      }
      else if (d === 2) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x + 15, p.y - 2, 20, 2)
        fill('yellow')
        rect(p.x + 15, p.y, 20, 2)
        fill('blue')
        rect(p.x + 15, p.y + 2, 20, 2)
      }
      else if (d === 3) {
        fill('white')
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 2, p.y + 15, 2, 20)
        fill('yellow')
        rect(p.x, p.y + 15, 2, 20)
        fill('blue')
        rect(p.x + 2, p.y + 15, 2, 20)
      }
      else if (d === 4) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 15, p.y - 2, 20, 2)
        fill('yellow')
        rect(p.x - 15, p.y, 20, 2)
        fill('blue')
        rect(p.x - 15, p.y + 2, 20, 2)
      }
    }
    for (let i = 0; i < div.length; i++) {
      d = getRotation(div[i])
      p = div[i]

      if (d === 1) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        fill('red')
        rect(p.x + 15, p.y, 20, 6)
        fill('yellow')
        rect(p.x, p.y - 15, 6, 20)
        fill('blue')
        rect(p.x - 15, p.y, 20, 6)
      }
      else if (d === 2) {
        fill('white')
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x, p.y + 15, 6, 20)
        fill('yellow')
        rect(p.x + 15, p.y, 20, 6)
        fill('blue')
        rect(p.x, p.y - 15, 6, 20)
      }
      else if (d === 3) {
        fill('white')
        rect(p.x, p.y - 15, 6, 20)
        fill('red')
        rect(p.x - 15, p.y, 20, 6)
        fill('yellow')
        rect(p.x, p.y + 15, 6, 20)
        fill('blue')
        rect(p.x + 15, p.y, 20, 6)
      }
      else if (d === 4) {
        fill('white')
        rect(p.x + 15, p.y, 20, 6)
        fill('red')
        rect(p.x, p.y - 15, 6, 20)
        fill('yellow')
        rect(p.x - 15, p.y, 20, 6)
        fill('blue')
        rect(p.x, p.y + 15, 6, 20)
      }
    }
    for (let i = 0; i < col.length; i++) {
      d = getRotation(col[i])
      p = col[i]

      if (d === 1) {
        fill('white')
        rect(p.x, p.y + 20, 5, 15)
      }
      else if (d === 2) {
        fill('white')
        rect(p.x - 20, p.y, 15, 5)
      }
      else if (d === 3) {
        fill('white')
        rect(p.x, p.y - 20, 5, 15)
      }
      else if (d === 4) {
        fill('white')
        rect(p.x + 20, p.y, 15, 5)
      }
      else if (d === 5) {
        fill('white')
        rect(p.x, p.y, 3, 50)
      }
      else if (d === 6) {
        fill('white')
        rect(p.x, p.y, 50, 3)
      }
    }
    for (let i = 0; i < chek.length; i++) {
      d = getRotation(chek[i])
      p = chek[i]

      if (d === 1) {
        fill('white')
        rect(p.x, p.y, 5, 50)
      }
      else if (d === 2) {
        fill('white')
        rect(p.x, p.y, 50, 5)
      }


    }
  }//hehe

}











