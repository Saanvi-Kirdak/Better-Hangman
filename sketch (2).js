let gameWord
let wordList = []
let limbCount = 0
let revealedLetters = []
let wrongLetters = []

//bubbles
let bubbles = []
let numberOfBubbles = 30

async function setup() {
  createCanvas(400, 400)

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
  
  background("lightblue")
  // the following is here because p5 preload doesn't seem to work
  const response = await fetch("wordList.txt")
  const fileText = await response.text()
  wordList = fileText.split(/\r?\n/).filter(Boolean)
  startGame()
}

function draw() {
  background (15, 75, 120)
  //draw animated bubbles
  drawBubbles()
  

  //hangman code
  // added stroke(0)
  stroke(0)
  strokeWeight(10)
  line(100, 50, 100, 275)
  line(100, 50, 200, 50)
  line(50, 275, 150, 275)
  line(200, 50, 200, 73)
  drawLines()
  drawLetters()
  drawHangMan()
  drawWrongLetters()
}

function drawWrongLetters() {
  fill("white")
  rect(325, 20, 60, 240)
  textSize(30)
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

function drawHangMan() {
  if (limbCount > 0) {
    // head
    noFill();
    strokeWeight(5)
    circle(200, 100, 50)
  }
  if (limbCount > 1) {
    // torso
    line(200, 125, 200, 190)
  }
  if (limbCount > 2) {
    // leg 1
    line(200, 190, 180, 235)
  }
  if (limbCount > 3) {
    // leg 2
    line(200, 190, 220, 235)
  }
  if (limbCount > 4) {
    // arm 1
    line(180, 165, 200, 155)
  }
  if (limbCount > 5) {
    // arm 2
    line(220, 165, 200, 155)
  }
  if (limbCount > 6) {
    // eye 1
    circle(193, 95, 5)
  }
  if (limbCount > 7) {
    // eye 2
    circle(207, 95, 5)
  }  
  if (limbCount > 8) {
    // mouth
    arc(200, 108, 15, 15, 0, PI);
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
  handleGameOver() // ask user if they want to play again
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

function handleGameOver() {
  if (!isGameOver) {
    return
  }
  
  if (limbCount === 9) {
    console.log("You lost :( the program won")
    console.log("The word was: " + gameWord)
    textSize(14)
    text("The word was " + gameWord, 170, 330)
    fill("yellow")
    textSize(40)
    text("You Lost!", 165, 315);

  } else if (areAllLettersRevealed()) {
    console.log("You won! Good job")
    fill("yellow")
    textSize(50)
    text("You Won!", 165, 315);

  }
}

//draw and animate bubbles
function drawBubbles() {
  noFill()
  stroke(220, 250, 255, 180)
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