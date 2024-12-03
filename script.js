const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.getAttribute('data-index');

      if (boardState[index] !== '' || !gameActive) {
        return;
      }

      boardState[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (boardState.every(cell => cell !== '')) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return boardState[index] === currentPlayer;
        });
      });
    }

    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      boardState = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => (cell.textContent = ''));
      message.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
