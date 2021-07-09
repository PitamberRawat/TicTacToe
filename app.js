const x_class = 'x';
const o_class = 'o';
const winning_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restart = document.querySelector('.restart')
const reset = document.querySelector('.reset')
const winningMessageElement = document.querySelector('.winMsg')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let oTurn

startGame()

restart.addEventListener('click', startGame)

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

reset.addEventListener('click', () =>{
    cellElements.forEach(cell =>{
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)        
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
})

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? o_class : x_class;
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {

        endGame(false)

    }else if(isDraw()){

        endGame(true)
    
    }else{

        swapTurns()
    
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if (oTurn) {
        board.classList.add(o_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
