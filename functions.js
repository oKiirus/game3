  function keyPressed(){
  
  
  

  

  }
  
  function diaBox(x, y, w, h, t, e){
  
  
  if(t === 'fade'){
    diaTr += 3
    stroke(0)
    strokeWeight(5)
        fill(255, 255, 255, diaTr)
        rectMode(CENTER)
  
        rect(x, y, 600, 150)
    
    if(e === false){
      fill(100, 100, 100, diaTr)
    rect(x - 225, y, 150, 150)
    }
    
    
  }
  else if(t === 'norm'){
    
    
    fill(255, 255, 255)
        rectMode(CENTER)
  
        rect(x, y, 450, 150)
  }
}
  
  function shove(d, o){
    
    var speed = 8
    var x = 0
    var y = 0
    
    var object, pushable
   
    if(d === 1 && grid[PX][PY - 2][2] === 'empty' && PY !== 1){
       x = 0
      y = -1
      
      object = grid[PX][PY - 1][2]
      pushable = grid[PX][PY - 1][3]
      type = grid[PX][PY - 1][4]
      dir = grid[PX][PY - 1][5]
      
      grid[PX][PY - 1][3] = 'empty'
      grid[PX][PY - 1][2] = 'empty'
      grid[PX][PY - 1][4] = undefined
      grid[PX][PY - 1][5] = undefined
      
      grid[PX][PY - 2][3] = pushable
      grid[PX][PY - 2][2] = object
      grid[PX][PY - 2][4] = type
      grid[PX][PY - 2][5] = dir
      
       }
    else if(d === 2  && grid[PX + 2][PY][2] === 'empty' && PX !== 8){
       x = 1
      y = 0
      
      object = grid[PX + 1][PY][2]
      pushable = grid[PX + 1][PY][3]
      type = grid[PX + 1][PY][4]
      dir = grid[PX + 1][PY][5]
      
      grid[PX + 1][PY][3] = 'empty'
      grid[PX + 1][PY][2] = 'empty'
      grid[PX + 1][PY][4] = undefined
      grid[PX + 1][PY][5] = undefined
      
      grid[PX + 2][PY][3] = pushable
      grid[PX + 2][PY][2] = object
      grid[PX + 2][PY][4] = type
      grid[PX + 2][PY][5] = dir
       }
    else if(d === 3  && grid[PX][PY + 2][2] === 'empty' && PY !== 8){
       x = 0
      y = 1
      
      object = grid[PX][PY + 1][2]
      pushable = grid[PX][PY + 1][3]
      type = grid[PX][PY + 1][4]
      dir = grid[PX][PY + 1][5]
      
      grid[PX][PY + 1][3] = 'empty'
      grid[PX][PY + 1][2] = 'empty'
      grid[PX][PY + 1][4] = undefined
      grid[PX][PY + 1][5] = undefined
      
      grid[PX][PY + 2][3] = pushable
      grid[PX][PY + 2][2] = object
      grid[PX][PY + 2][4] = type
      grid[PX][PY + 2][5] = dir
       }
    else if(d === 4  && grid[PX - 2][PY][2] === 'empty' && PX !== 1){
       x = -1
      y = 0
      
      object = grid[PX - 1][PY][2]
      pushable = grid[PX - 1][PY][3]
      type = grid[PX - 1][PY][4]
      dir = grid[PX - 1][PY][5]
      
      grid[PX - 1][PY][3] = 'empty'
      grid[PX - 1][PY][2] = 'empty'
      grid[PX - 1][PY][4] = undefined
      grid[PX - 1][PY][5] = undefined
      
      grid[PX - 2][PY][3] = pushable
      grid[PX - 2][PY][2] = object
      grid[PX - 2][PY][4] = type
      grid[PX - 2][PY][5] = dir
       }
    
   
          
  
    
    oMov = object
   
    o.velocityX = x * speed
   o.velocityY = y * speed
    
      
  }
  
  function pull(d, o){
    var speed = 8
    var x = 0
    var y = 0
    
    var object, pushable
   
    if(d === 1 && grid[PX][PY - 1][2] === 'empty' && PY !== 0){
       x = 0
      y = -1
      
      object = grid[PX][PY + 1][2]
      pushable = grid[PX][PY + 1][3]
      type = grid[PX][PY + 1][4]
      dir = grid[PX][PY + 1][5]
      
      grid[PX][PY + 1][3] = 'empty'
      grid[PX][PY + 1][2] = 'empty'
      grid[PX][PY + 1][4] = undefined
      grid[PX][PY + 1][5] = undefined
      
      grid[PX][PY][3] = pushable
      grid[PX][PY][2] = object
      grid[PX][PY][4] = type
      grid[PX][PY][5] = dir
      
       }
    else if(d === 2  && grid[PX + 1][PY][2] === 'empty' && PX !== 9){
       x = 1
      y = 0
      
      object = grid[PX - 1][PY][2]
      pushable = grid[PX - 1][PY][3]
      type = grid[PX - 1][PY][4]
      dir = grid[PX - 1][PY][5]
      
      grid[PX - 1][PY][3] = 'empty'
      grid[PX - 1][PY][2] = 'empty'
      grid[PX - 1][PY][4] = undefined
      grid[PX - 1][PY][5] = undefined
      
      grid[PX][PY][3] = pushable
      grid[PX][PY][2] = object
      grid[PX][PY][4] = type
      grid[PX][PY][5] = dir
       }
    else if(d === 3  && grid[PX][PY + 1][2] === 'empty' && PY !== 9){
       x = 0
      y = 1
      
      object = grid[PX][PY - 1][2]
      pushable = grid[PX][PY - 1][3]
      type = grid[PX][PY - 1][4]
      dir = grid[PX][PY - 1][5]
      
      grid[PX][PY - 1][3] = 'empty'
      grid[PX][PY - 1][2] = 'empty'
      grid[PX][PY - 1][4] = undefined
      grid[PX][PY - 1][5] = undefined
      
      grid[PX][PY][3] = pushable
      grid[PX][PY][2] = object
      grid[PX][PY][4] = type
      grid[PX][PY][5] = dir
       }
    else if(d === 4  && grid[PX - 1][PY][2] === 'empty' && PX !== 0){
       x = -1
      y = 0
      
      object = grid[PX + 1][PY][2]
      pushable = grid[PX + 1][PY][3]
      type = grid[PX + 1][PY][4]
      dir = grid[PX + 1][PY][5]
      
      grid[PX + 1][PY][3] = 'empty'
      grid[PX + 1][PY][2] = 'empty'
      grid[PX + 1][PY][4] = undefined
      grid[PX + 1][PY][5] = undefined
      
      grid[PX][PY][3] = pushable
      grid[PX][PY][2] = object
      grid[PX][PY][4] = type
      grid[PX][PY][5] = dir
       }
    
    oMov = object
   
    o.velocityX = x * speed
   o.velocityY = y * speed
  }
  
  function makeBox(X, Y, m, t, d, c){ // s : movable  t : type  d : direction (1: up  2: right ...)
    
    var C 
    var x = 130 + 60 * X
    var y = 180 + 60 * Y
    
    if(t === 'lazer'){
        C = 'red'
    } else if(t === 'mirror'){
        C = 'grey'
    } else if(t === 'col'){
        C = 'lightblue'
    } else if(t === 'finish'){
        C = 'yellow'
    } else if(t === 'wall'){
        C = 'grey'
    } else if(t === 'merger'){
        C = 'grey'
    } else if(t === 'diverger'){
        C = 'grey'
    }
    if(t !== 'wall' && t !== 'dGlass' && t !== 'glass'){
      grid[X][Y][2] = createSprite(x, y, 50, 50) //here

/*

      if(t === 'lazer'){
        grid[X][Y][2].addImage(lazers) 
    } else if(t === 'mirror'){
      grid[X][Y][2].addImage(mirror) 
    } else if(t === 'col'){
      grid[X][Y][2].addImage(collector) 
    } else if(t === 'finish'){
      grid[X][Y][2].addImage(end) 
    } else if(t === 'wall'){
      grid[X][Y][2].addImage(wall) 
    } else if(t === 'merger'){
      grid[X][Y][2].addImage(merger) 
    } else if(t === 'diverger'){
      grid[X][Y][2].addImage(diverger) 
    }
   
    */
      
  } else {
    grid[X][Y][2] = createSprite(x, y, 50, 50) //here
    grid[X][Y][2].addImage(astroid) 
  }
    grid[X][Y][3] = m
    grid[X][Y][4] = t
    grid[X][Y][5] = d
    
    if(t === 'col' || t === 'checkpoint'){
       col.add(grid[X][Y][2])
       col[col.length - 1].shapeColor = c
       setRotation(col[col.length - 1], d)
      on.push(false)
      
    } 
    
    else if(t === 'lazer'){
                 shootLazer(X, Y, d, c)
         laz.add(grid[X][Y][2])
         laz[laz.length - 1].shapeColor = c
      setRotation(laz[laz.length - 1], d)
    } 
    
    else if(t === 'wall'){
           
         wal.add(grid[X][Y][2])
         wal[wal.length - 1].shapeColor = C
      setRotation(wal[wal.length - 1], d)
    } 
    
    else if(t === 'glass'){
              
         gal.add(grid[X][Y][2])
         gal[gal.length - 1].shapeColor = c
      setRotation(gal[gal.length - 1], d)
    } 
    
    else if(t === 'dGlass'){
                
         dGal.add(grid[X][Y][2])
         dGal[dGal.length - 1].shapeColor = c
      setRotation(dGal[dGal.length - 1], d)
    } 
    
    else if(t === 'merger'){
                
         mer.add(grid[X][Y][2])
         mer[mer.length - 1].shapeColor = C
      setRotation(mer[mer.length - 1], d)
    } 
    
    else if(t === 'diverger'){
                
         div.add(grid[X][Y][2])
         div[div.length - 1].shapeColor = C
      setRotation(div[div.length - 1], d)
    } 
    
   
    
    else if(t === 'mirror'){
                 
         mirB.add(grid[X][Y][2])
         mirB[mirB.length - 1].shapeColor = C
      setRotation(mirB[mirB.length - 1], d)
      mirC.push(c)
    } 
    
    
    else {
         rec.add(grid[X][Y][2])
                   rec[rec.length - 1].shapeColor = C
      setRotation(rec[rec.length - 1], d)
         
    }
    
    
    
    
    
  }

  function move(x, y, o){
    
   var speed = 8                                                  //empty space
   
   
    o.velocityX = x * speed
   o.velocityY = y * speed
      moving = true
      
  }

  function finish() {
    
    var e = []
    var t = false
    
   for(let i = 0; i < nes.length; i++){
     e.push(on[nes[i]])
   }
    console.log(on)
   for(let i = 0; i < e.length; i++){
     
     if(e[i] || on === []){
        t = true
        } else {
          t = false
          break
        }
   }
    
    if(t || on === []){
       console.log('done')
      clearGrid(0, 0)
  }
     
     
  }

  function clearGrid(X, Y){
      for(let x = 0; x < 10; x++){
    for(let y = 0; y < 10; y++){
      grid[x][y] = []
      grid[x][y].push(130 + 60 * x)
      grid[x][y].push(180 + 60 * y)
      grid[x][y].push('empty')
      grid[x][y].push('empty')
      grid[x][y].push(undefined)
      grid[x][y].push(undefined)
    }
  }
     grid[0][0][2] = player
     PX = X
     PY = Y
     
     player.x = Xx(X)
     player.y = Yy(Y)
     
     lazers = []
     lazerCol = []
     
     
     while(rec[0] !== undefined) {
     rec[0].remove();
       } 
         
     while(col[0] !== undefined){
     col[0].remove();
  } 
     while(laz[0] !== undefined) {
     laz[0].remove();
       } 
     while(mir[0] !== undefined) {
     mir[0].remove();
       } 
     while(mirB[0] !== undefined) {
     mirB[0].remove();
       } 
     while(wal[0] !== undefined) {
     wal[0].remove();
       } 
     while(gal[0] !== undefined) {
     gal[0].remove();
       } 
     while(dGal[0] !== undefined) {
     dGal[0].remove();
       } 
     while(mer[0] !== undefined) {
     mer[0].remove();
       } 
     while(div[0] !== undefined) {
     div[0].remove();
       } 
     while(chek[0] !== undefined) {
     chek[0].remove();
       } 
     
         
     on = []
     nes = []
     Tr = 0
     gamenum++
     gamestate = 'Gfade'
     start = true
     
    
    }
  
  function shootLazer(X, Y, d, c){
    lazers = []
 
    lazers.push([[X, Y, d, c, true]])
    lazerCol.push([[X, Y, c]])
   
    
    
  }
  
  function MF(dl, dm){
    
    var d
    
    if(dm === 1){
      if(dl === 1){
         d = 4
      } else if (dl === 2){
         d = 3
      } else if (dl === 3){
         d = 2
      } else if (dl === 4){
         d = 1
      }
    }
    
    if(dm === 2){
       if(dl === 1){
         d = 2
      } else if (dl === 2){
         d = 1
      } else if (dl === 3){
         d = 4
      } else if (dl === 4){
         d = 3
      }
    }
    
    return d
  }
  
  function Xx(X){
  
  //130 - 730
  
  var x
  
  if(X === -1){
      x = 95
    } else if(X === 10){
              x = 700
    } else {
      x = X * 60 + 130
    }

  
    return x
    
}
  
  function Yy(Y){
  
  //130 - 730
  
  var y
  
 
    
    if(Y === -1){
      y = 145
    } else if(Y === 10){
              y = 755
    } else {
      y = Y * 60 + 180
    }
  
    return y
    
}
  
  function xTX(X){
  
  //130 - 730
  
  var x
  
  for(let i = 100; i < 700; i += 60){
    if(X >= i && X <= i + 60){
         x = (i - 100) / 60
       }
  }
  
    return x
    
}
  
  function yTY(Y){
  
  //130 - 730
  
  var y
  
  for(let i = 150; i < 750; i += 60){
    if(Y >= i && Y <= i + 60){
         y = (i - 150) / 60
       }
  }
  
    return y
    
}
  
  function setRotation(o, d){
    o.rotation = d / 10000000000000
  }
  
  function getRotation(o){
    return o.rotation * 10000000000000
  }
    
  function colorM(a){
    
    var e = []

    for(let i = 0; i < a.length; i++){

      if(a[i] !== ''){
         e.push(a[i])
         }
    }
  if(e.length === 3){
      return 'white'
     } else if((e[0] === 'red' && e[1] === 'yellow') || (e[0] === 'yellow' && e[1] === 'red')){
      return 'orange'
     } else if(e[0] === 'blue' && e[1] === 'yellow' || e[0] === 'yellow' && e[1] === 'blue'){
              return 'green' 
               } else if(e[0] === 'red' && e[1] === 'blue' || e[0] === 'blue' && e[1] === 'red'){
                         return 'purple'
                         } else if(e.length === 3){
                                  return 'white'
                                   }  else if(e.length === 1) {
                                             return e[0]
                                           } else if(e === []){
                                                     
                                                   }
  

  }
    
  function colorMerge(a, b){
   
    num1 = colorD(a)
    num2 = colorD(b)
    num3 = ['', '', '']
         
        

    if(num1[0] === 'red' || num2[0] === 'red'){
          num3[0] = 'red'
       }
    
    if(num1[1] === 'yellow' || num2[1] === 'yellow'){
          num3[1] = 'yellow'
       }
    
    if(num1[2] === 'blue' || num2[2] === 'blue'){
          num3[2] = 'blue'
       }
    
    return colorM(num3)
    
  }
    
  function colorD(a){
    if(a === 'orange'){
       return ['red', 'yellow', '']
       } else if(a === 'green'){
                 return ['', 'yellow','blue']
                 } else if(a === 'purple'){
                           return ['red', '', 'blue']
                           } else if(a === 'white'){
                             return ['red', 'yellow', 'blue']
                                   } else if(a === 'red'){
                                       return ['red', '', '']
                                             } else if(a === 'yellow'){
                                               return ['', 'yellow', '']
                                                     } else if(a === 'blue'){
                                                       return ['', '', 'blue']
                                                             } else {
                                                               return a
                                                             }
  }
    
