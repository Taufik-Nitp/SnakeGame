let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 5 // determines the speed of snake or the fps of the game
let lastPaintTime = 0
let board = document.getElementById('board')
let food = { x: 4, y: 6 }
let score = 0
let snakeArr = [{ x: 13, y: 15 }]

/// code for fps
function main(ctime) {
  // ctime return the current time
  window.requestAnimationFrame(main)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return
  }
  lastPaintTime = ctime
  gameEngine()
  // musicSound.play()
  // moveSnake()
}
// collision function
function isCollide(sarr) {
  if (
    sarr[0].x === 0 ||
    sarr[0].y === 0 ||
    sarr[0].x === 19 ||
    sarr[0].y === 19
  ) {
    return true
  }

  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) return true
  }
  return false
}
localStorage.setItem('highestScore', '1')

let ismove = true

// All game logic is here

function gameEngine() {
  //  updating the snake and the food

  if (isCollide(snakeArr)) {
    gameOverSound.play()
    musicSound.pause()
    inputDir = { x: 0, y: 0 }
    alert('Game over.. Press any button to start')
    snakeArr = [{ x: 13, y: 15 }]
    musicSound.play()
    score = 0
  }

  /// determining the speed of the snake

  if (snakeArr.length > 15) {
    speed = snakeArr.length / 3
  }

  // if snake eat the food

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play()
    snakeArr.unshift({
      // unshift add it to the begining of the array
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    })
    let a = 2
    let b = 16
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }
  }

  // moving the snake

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (ismove) {
        ismove = false
        musicSound.pause()
      } else {
        ismove = true
        musicSound.play()
      }
    }
  })

  if (ismove) {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
  }

  //   score and highest score display
  let scoreBoard = document.getElementById('scoreBoard')

  if (snakeArr.length > parseInt(localStorage.getItem('highestScore'))) {
    localStorage.setItem('highestScore', snakeArr.length.toString())
  }
  let hs = localStorage.getItem('highestScore')
  scoreBoard.innerHTML = `Score: ${snakeArr.length} <br> Highest Score:${hs}`

  //    display the  snake and the food
  board.innerHTML = ''
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
      snakeElement.classList.add('head')
    } else {
      snakeElement.classList.add('snake')
    }

    board.appendChild(snakeElement)
  })
  foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  board.appendChild(foodElement)
}
window.requestAnimationFrame(main)
// changing the direction of the head of the snake
window.addEventListener('keydown', (e) => {
  // inputDir = { x: 0, y: 1 }
  moveSound.play()
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0
      inputDir.y = -1
      break

    case 'ArrowDown':
      inputDir.x = 0
      inputDir.y = 1
      break

    case 'ArrowLeft':
      inputDir.x = -1
      inputDir.y = 0
      break

    case 'ArrowRight':
      inputDir.x = 1
      inputDir.y = 0
      break

    default:
      break
  }

  /// touch events for mobile

  document.getElementById('arrowUp').addEventListener('click', (e) => {
    inputDir.x = 0
    inputDir.y = -1
  })

  document.getElementById('arrowDown').addEventListener('click', (e) => {
    inputDir.x = 0
    inputDir.y = 1
  })

  document.getElementById('arrowLeft').addEventListener('click', (e) => {
    inputDir.x = -1
    inputDir.y = 0
  })

  document.getElementById('arrowRight').addEventListener('click', (e) => {
    inputDir.x = 1
    inputDir.y = 0
  })
})
