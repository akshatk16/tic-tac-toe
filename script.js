const CLASS_X = 'x'
const CLASS_O = 'o'

let o_turn
let ai

const WINS = [
	// rows
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// cols
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// diagonals
	[0, 4, 8],
	[2, 4, 6]

]

const spots = document.querySelectorAll('[spot-pos]')
const grid = document.getElementById('grid')
const winnerText = document.querySelector('[winner]')
const startMenu = document.getElementById('startMenu')
const win = document.getElementById('win')
const restartButton = document.getElementById('restartButton')
const playComp = document.getElementById('com_p')
const playHuman = document.getElementById('two_p')


function handleClick(e) {
	const spot = e.target
	const currentClass = o_turn ? CLASS_O : CLASS_X
	// place current token
	spot.classList.add(currentClass)

	// check for winning combinations
	if (winner(spots, currentClass)) {
		endGame(false)
	} else if (isDraw(spots)) {
		endGame(true)
	} else {
		// change token
		o_turn = !o_turn

		//add hover class
		addHover()

		// trigger ai move if required
		if (o_turn && ai) {
			playAI()
		}
	}
}


function addHover() {
	// remove current hover class
	grid.classList.remove(CLASS_X)
	grid.classList.remove(CLASS_O)

	// compute reqd hover class
	let hoverClass = o_turn ? CLASS_O : CLASS_X

	// add reqd hover class
	grid.classList.add(hoverClass)
}


function winner(board, currentClass) {
	// check for win condition
	return WINS.some(combination => {
		return combination.every(index => {
			return board[index].classList.contains(currentClass)
		})
	})
}


function isDraw(board) {
	// check for draw condition
	return [...board].every(spot => {
		return spot.classList.contains(CLASS_O) || spot.classList.contains(CLASS_X)
	})
}


function startGame() {
	// start condition - X turn
	o_turn = false

	// hide start menu
	startMenu.classList.remove('show')

	// clear previous grid and add onClickEvents
	spots.forEach(spot => {
		spot.classList.remove(CLASS_X)
		spot.classList.remove(CLASS_O)
		spot.removeEventListener('click', handleClick)
		spot.addEventListener('click', handleClick, {
			once: true
		})
	})

	// add hover
	addHover()
}


function startGameAI() {
	// if player choose to play with ai
	ai = true
	startGame()
}


function playAI() {
	// compute best possible move
	optimalMove(spots)

	// check if ai wins
	if (winner(spots, CLASS_O)) {
		endGame(false, true)
	}

	// switch turns
	o_turn = !o_turn

	// add hover
	addHover()
}


function endGame(draw, comp) {
	if (comp) {
		// switch for o win text
		o_turn = true
	}
	if (draw) {
		winnerText.innerHTML = 'TIED!'
	} else {
		winnerText.innerHTML = `${o_turn ? "O WINS!" : "X WINS!"}`
	}

	// show win overlay
	win.classList.add('show')
}


function restartGame() {
	// display start menu
	ai = false
	startMenu.classList.add('show')

	// hide win overlay
	win.classList.remove('show')

	// start game
	playComp.addEventListener('click', startGameAI)
	playHuman.addEventListener('click', startGame)
}


// onClick events
restartButton.addEventListener('click', restartGame)
playComp.addEventListener('click', startGameAI)
playHuman.addEventListener('click', startGame)
