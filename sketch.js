var playbutton, aboutbutton
var gameState = "logo"
var bg1
var stars = []
var timer

function preload() {
    bg1 = loadImage('bg1.jpeg')
    logoimg = loadImage("logo.gif")
    spaceimg = loadImage("space.gif")
    popupimg = loadImage("popup.png")
}

function setup() {
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
    homebutton.position(50, 100)
    homebutton.size(100, 100)

    aboutbutton = createImg("about.png")
    aboutbutton.position(50, 200)
    aboutbutton.size(100, 100)

    soundbutton = createImg("sound.png")
    soundbutton.position(50, 300)
    soundbutton.size(100, 100)

    nosoundbutton = createImg("nosound.png")
    nosoundbutton.position(50, 300)
    nosoundbutton.size(100, 100)

    nosoundbutton.hide()

    //volume=createSlider(0,2,0.5,0.01)
    //volume.position(50,windowHeight-100)


}



function draw() {


   
}

