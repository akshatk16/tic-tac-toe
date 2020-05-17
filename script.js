const CLASS_X = 'x'
const CLASS_O = 'o'

let o_turn

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
const win = document.getElementById('win')
const restartButton = document.getElementById('restartButton')


startGame()


function handleClick(e) {
	const spot = e.target
	const currentClass = o_turn ? CLASS_O : CLASS_X
	// place current token
	spot.classList.add(currentClass)

	// check for winning combinations
	if (winner(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		// change token
		o_turn = !o_turn

		//add hover class
		addHover()
	}
}


function addHover() {
	grid.classList.remove(CLASS_X)
	grid.classList.remove(CLASS_O)
	let hoverClass = o_turn ? CLASS_O : CLASS_X
	grid.classList.add(hoverClass)
}


function winner(currentClass) {
	return WINS.some(combination => {
		return combination.every(index => {
			return spots[index].classList.contains(currentClass)
		})
	})
}


function startGame() {
	o_turn = false
	spots.forEach(spot => {
		spot.classList.remove(CLASS_X)
		spot.classList.remove(CLASS_O)
		spot.removeEventListener('click', handleClick)
		spot.addEventListener('click', handleClick, {
			once: true
		})
	})
	addHover()
	win.classList.remove('show')

}


function isDraw() {
	return [...spots].every(spot => {
		return spot.classList.contains(CLASS_O) || spot.classList.contains(CLASS_X)
	})
}


function endGame(draw) {
	if (draw){
		winnerText.innerHTML = 'TIED!'
	} else {
		winnerText.innerHTML = `${o_turn ? "O WINS!" : "X WINS!"}`
	}
	win.classList.add('show')
}


restartButton.addEventListener('click', startGame)
