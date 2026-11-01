let gameWord
let wordList = []
let limbCount = 0
let revealedLetters = []
let wrongLetters = []

//bubbles
let bubbles = []
let numberOfBubbles = 30
const musicWon = "wonSound.mp3"
const musicLost = "lostSound.mp3"
let wonSound
let lostSound
let musicHasBeenPlayed = false

async function setup() {
  createCanvas(400, 400)
  wonSound = await loadSound(musicWon);
  lostSound = await loadSound(musicLost);

  //create bubbles across the screen
  for (let i = 0; i < numberOfBubbles; i++){
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 18),
      speed: random(0.5, 2),
      drift: random(-0.3, 0.3)
    })
  }
  
  // the following is here because p5 preload doesn't seem to work
  const response = await fetch("wordList.txt")
  const fileText = await response.text()
  wordList = fileText.split(/\r?\n/).filter(Boolean)
  startGame()
}

function draw() {
  //physics!! yay!!
   const acceleration = (restY-circleY)*stiff
  const dt = deltaTime/1000
  velocity += acceleration * dt
  circleY += velocity * dt
  velocity *= 0.95

  const handRestY = circleY +60
  handY = handRestY + sin(angle)*amplitude;
  angle += 0.2;
  amplitude *= 0.5

  background ("lightblue")
  //draw animated bubbles
  drawBubbles()
  
  if (!isGameOver()) {
    //hangman code
    // added stroke(0)
    stroke(0)
    strokeWeight(10)
    line(100, 50, 100, 330)
    line(100, 50, 200, 50)
    line(50, 330, 150, 330)
    strokeWeight(4)
    line(200, 50, 200, circleY-25)
    drawLines()
    drawLetters()
    drawWrongLetters()
    drawHead()
    drawTorso()
    drawArm1()
    drawArm2()
    drawLeg1()
    drawLeg2()
    drawEye1()
    drawEye2()
    drawMouth()
  } else {
    drawGameOver()
  }


}

function playMusicOnce() {
  if(!musicHasBeenPlayed) {
    play
  }
}

function drawWrongLetters() {
  fill("white")
  rect(325, 20, 60, 240)
  textSize(30)
  textWeight(10)
  fill("black")
  for (wrongLetterPos = 0; wrongLetterPos < wrongLetters.length; wrongLetterPos++) {
    text(wrongLetters[wrongLetterPos], 340, 52 + 25 * wrongLetterPos)
  }
}

function drawLetters() {
  textSize(50)
  fill("black")
  for (letterPosition = 0; letterPosition < gameWord.length; letterPosition++) {
    if (revealedLetters.includes(gameWord[letterPosition])) {
      text(gameWord[letterPosition], 18 + 40 * letterPosition, 375)
    }
  }
}

function drawLines() {
  strokeWeight(3)
  for (dash = 0; dash < gameWord.length; dash++) {
    line(20 + 40 * dash, 380, 45 + 40 * dash, 380)
  }
}


function startGame() {
  chooseWord()
  // console.log(gameWord)
}

function keyPressed() {
  if(!isGameOver()) {
    if (isLetterInWord(key)) {
      revealedLetters.push(key)
      // console.log("Letter is present")
      // console.log(revealedLetters)
    } else {
      limbCount++
      wrongLetters.push(key)
      // console.log("Letter is not present")
      // console.log(limbCount + " limbs are drawn")
    }
  }
  drawGameOver() // ask user if they want to play again
}

function chooseWord() {
  index = Math.floor(Math.random()*wordList.length)
  gameWord = wordList[index]
}

function isGameOver() {
  if (limbCount === 9) {
    return true
  } else if (areAllLettersRevealed()) {
    return true
  }
  return false
}

function isLetterInWord(key) {
  if (gameWord.includes(key)) {
    return true
  }
  return false
}

function areAllLettersRevealed() {
  for (letterPosition = 0; letterPosition < gameWord.length; letterPosition++) {
    if (!revealedLetters.includes(gameWord[letterPosition])) {
      return false
    }
  }
  return true
}

function drawGameOver() {
  if (!isGameOver()) {
    return
  }
  
  fill("yellow")
  textAlign(CENTER, CENTER);
  textWeight(900)
  noStroke()
  if (limbCount === 9) {
    textSize(30)
    text("The word was " + gameWord, 200, 275)
    textSize(60)
    text("You Lost!", 200, 200);
    if(!musicHasBeenPlayed) {
      lostSound.play()
      musicHasBeenPlayed = true
    }

  } else if (areAllLettersRevealed()) {
    textSize(60)
    text("You Won!", 200, 200);
    if(!musicHasBeenPlayed) {
      wonSound.play()
      musicHasBeenPlayed = true
    }
  }

}

//draw and animate bubbles
function drawBubbles() {
  noFill()
  stroke("blue")
  strokeWeight(2)

  for (let bubble of bubbles) {
    //draw each bubble
    circle(bubble.x, bubble.y, bubble.size)

    //move upward
    bubble.y -= bubble.speed

    //drift sideways
    bubble.x += bubble.drift

    //wrap around the sides
    if (bubble.x < 0) {
      bubble.x = width
    }
    if (bubble.x > width) {
      bubble.x = 0
    }

    //reset at the bottom when the bubbles reach the top
    if (bubble.y < -bubble.size){
      bubble.y = height + random(10, 100)
      bubble.x = random(width)
    }
  }
}