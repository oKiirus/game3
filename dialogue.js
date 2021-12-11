var ie = 0
var y = 660
var x = 300
var si = ''
var ab = 0


function talk(s, p){
  
  
  
  
  
  si = s

  for(let i = 0; i < s.length; i++){
    
    
    
    if(s.charAt(ie) === ';'){
      x = 288
    y += 40
      
      ab++
    }
    
    if(s.charAt(ie) !== ';'){
    
    x += 12
    
      
      if(letters.length < s.length - ab){
         letters.push(new Letter(x, y, s.charAt(ie)))
         }
        
        
      
 
      
    
  }
    ie++
    
    
  }
  
  if(letters.length === s.length - ab){
    done = true
    heat = 1
  }
  
  
  
  
}