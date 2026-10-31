let circleY = 0;
let restY = 100
const stiff = 100
const displacement = circleY-restY
let velocity =0
let bodyMass = 15
let armMass = 5
let legMass = 10
let angle = 0;
let amplitude = 0;


function drawHead(){
  if (limbCount > 0){
    fill("#FFFFFF")
    strokeWeight(4)
    circle(200,circleY,50)

    circleY += 3
  }
}
function drawTorso(){
  if (limbCount > 1){
    let lineX = 200
    let lineY = circleY + 20
    strokeWeight(4);
    let x = createVector(lineX,lineY+5);
    let y = createVector(lineX, lineY + 75);
    line(x.x,x.y,y.x,y.y)

    circleY += bodyMass
  }
}

function drawLeg1(){
  if (limbCount > 2){
    strokeWeight(4)
    p1 = createVector(200,circleY+80)
    p2 = createVector(170,circleY +140)
    line(p1.x,p1.y,p2.x,p2.y)

    circleY += legMass
  }
}

function drawLeg2(){
  if (limbCount > 3){
    strokeWeight(4)
    p1 = createVector(200,circleY+75)
    p2 = createVector(230, circleY+130)
    line(p1.x,p1.y,p2.x,p2.y)

    circleY += legMass
    amplitude +=8
  }
}

function drawArm1(){
  if (limbCount > 4){
    line(200,circleY+20,160,handY)
  }
}
function drawArm2(){
  if (limbCount > 5){
    line(200,circleY+20,240,handY)
   
  }
}

function drawEye1(){
  if (limbCount > 6){
    if (frameCount % 120 >= 5){
    circle(193,circleY-35,5)
    }else{
      line(190,circleY-35,198,circleY-35)
    }

  }
}

function drawEye2(){
  if (limbCount > 7){
    if (frameCount % 120 >= 8){
    circle(207,circleY-35,5)}
    else{
      line(202,circleY-35,210,circleY-35)
    }
  }
}

function drawMouth(){
  if (limbCount > 8){
    arc(200,circleY-20,10,5,0,PI)
  }
}


