function optimalMove(board) {
	let bestMove
	let recScore = -10000
	let move
	for (let i = 0; i < board.length; i++) {
		if (!(board[i].classList.contains(CLASS_O) || board[i].classList.contains(CLASS_X))) {
			// temporarily add player class
			board[i].classList.add(CLASS_O)
			// recursively call minimax on new board position
			let score = minimax(board, 0, false)

			// remove temporarily added class
			board[i].classList.remove(CLASS_O)

			// maximise score
			if (score > recScore) {
				recScore = score

				// store this move as potential best move
				move = i
			}
		}
	}

	// play the best move
	bestMove = spots[move]
	bestMove.removeEventListener('click', handleClick)
	bestMove.classList.add(CLASS_O)
}


function minimax(board, depth, aiMove) {
	// terminal states
	if (winner(board, CLASS_O)) {
		return 100
	} else if (winner(board, CLASS_X)) {
		return -100
	} else if (isDraw(board)) {
		return 0
		// evaluate minimax recursively
	} else {
		if (aiMove) {
			// maximising player
			let bestVal = -10000
			for (let j = 0; j < board.length; j++) {
				if (!(board[j].classList.contains(CLASS_O) || board[j].classList.contains(CLASS_X))) {
					// temporarily add player class
					board[j].classList.add(CLASS_O)

					// recursively call minimax on new board position
					let val = minimax(board, depth + 1, false) - depth

					// remove temporarily added class
					board[j].classList.remove(CLASS_O)

					// maximise score
					if (val > bestVal) {
						bestVal = val
					}
				}
			}
			return bestVal
		} else {
			let bestVal = 10000
			for (let k = 0; k < board.length; k++) {
				if (!(board[k].classList.contains(CLASS_O) || board[k].classList.contains(CLASS_X))) {
					// temporarily add player class
					board[k].classList.add(CLASS_X)

					// recursively call minimax on new board position
					let val = minimax(board, depth + 1, true) + depth

					// remove temporarily added class
					board[k].classList.remove(CLASS_X)

					// minimise score
					if (val < bestVal) {
						bestVal = val
					}
				}
			}
			return bestVal
		}
	}
}
