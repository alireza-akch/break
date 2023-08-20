const mydocumentbody = document.getElementById('body')
const blocks_container = document.querySelector('.blocks_container')
const block = document.getElementById('main_block')
let move = 360
//container variables
const containerWidth = 850
const containerHeight = 530
//score variables
const scoreDisplay = document.querySelector('#score')
let score = 0
//ball variabales
const ball = document.getElementById('ball')
const ballDiameter = 25
const ballStart = [380, 80]
let ballCurrentPosition = ballStart
let timerId
let xDirection = 2
let yDirection = 2




//main_block movement
mydocumentbody.addEventListener("keypress", blockMove);
function blockMove(event){
    let x = event.key;
    if ((x === "a" || x === "A") && move >= 10 ) { 
      block.style.left = move + "px" ; 
      move -= 15;
      console.log(move);
  }
    else if ((x === "d" || x === "D") && move <= 730) { 
      block.style.left = move + "px"; 
      move += 15;
      console.log(move);
  }  
}
console.log(move);


//block collision
// function blockCollision(){
//   block = changeDirection();
// }




//ball
function drawBall(){
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}



//ball moving
function moveBall(){
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollisions()
  checkForGameOver()
}

timerId = setInterval(moveBall,10)


//check for collisions
function checkForCollisions(){
  //check for wall collisions
  if(ballCurrentPosition[0] >= (containerWidth - ballDiameter) ||
     ballCurrentPosition[1] >= (containerHeight - ballDiameter) ||
     ballCurrentPosition[0] <= 0 
      ){
  changeDirection()
  }
  //check for blocks collisions
  
}


function changeDirection(){
  if(xDirection === 2 && yDirection === 2){
    yDirection = -2
    return
  }
  if(xDirection === 2 && yDirection === -2){
    xDirection = -2
    return
  }
  if(xDirection === -2 && yDirection === -2){
    yDirection = 2
    return
  }
  if(xDirection === -2 && yDirection === 2){
    xDirection = 2
    return
  }
  
}


//check for gameover
function checkForGameOver(){
  if(ballCurrentPosition[1] <= 0){
  clearInterval(timerId)
  scoreDisplay.innerHTML = ' NOOB :) '
  mydocumentbody.removeEventListener('keypress',blockMove)
}
}

