class Letter {
  
  constructor(x, y, l){
    this.x = x
    this.y = y
    this.l = l
  }
  
  show(){
    textAlign(CENTER)
    fill(0)
    textSize(20)
    noStroke()
    text(this.l, this.x, this.y)
  }
  
  hide(){
    //idk why i made this eAstEr egG
  }
}