let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const clickedCell = event.target;
    if (clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer;
        if (checkWinner()) {
            winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else if (isDraw()) {
            winnerDisplay.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    winnerDisplay.textContent = '';
    currentPlayer = 'X';
}
