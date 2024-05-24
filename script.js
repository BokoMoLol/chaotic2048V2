document.addEventListener('DOMContentLoaded', () => {
    let boardSize = 4;
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    const gameBoard = document.getElementById('game-board');

    // Initialize game board
    function initializeBoard() {
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                createTile(i, j);
            }
        }
        addRandomTile();
        addRandomTile();
        updateBoard();
    }

    // Create a tile element
    function createTile(row, col) {
        const tile = document.createElement('div');
        tile.id = `tile-${row}-${col}`;
        tile.className = 'tile';
        gameBoard.appendChild(tile);
    }

    // Add a random tile
    function addRandomTile() {
        let emptyTiles = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === 0) {
                    emptyTiles.push({ row: i, col: j });
                }
            }
        }

        if (emptyTiles.length > 0) {
            const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            board[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    // Update the game board UI
    function updateBoard() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const tile = document.getElementById(`tile-${i}-${j}`);
                if (board[i][j] === -1) {
                    tile.textContent = 'X';
                    tile.style.backgroundColor = '#8b0000';
                } else {
                    tile.textContent = board[i][j] === 0 ? '' : board[i][j];
                    tile.style.backgroundColor = board[i][j] === 0 ? '#cdc1b4' : '#eee4da';
                }
            }
        }
    }

    // Modify the merge result based on the specified probabilities
    function modifyMergeResult(value) {
        const randomValue = Math.random();
        if (randomValue < 0.02) {
            return 69420; // 2% chance to change to 69420
        } else if (randomValue < 0.12) {
            return value; // 10% chance to stay the same
        } else if (randomValue < 0.32) {
            return value + 1; // 20% chance to add 1
        } else if (randomValue < 0.52) {
            return value - 1; // 20% chance to subtract 1
        } else if (randomValue < 0.77) {
            return -value; // 25% chance to multiply by -1
        } else if (randomValue < 0.84) {
            return `√${value}`; // 7% chance to take the square root
        } else if (randomValue < 0.89) {
            return value + Math.floor(Math.random() * 21) - 10; // 5% chance to add random value between -10 and 10
        }
        return value * 2; // Default merge behavior
    }

    // Handle grid explosion
    function handleExplosion(row, col) {
        board[row][col] = -1;
    }

    // Move and merge tiles in the specified direction
    function move(direction) {
        let moved = false;

        const moveRow = (row) => {
            const newRow = row.filter(val => val !== 0 && val !== -1);
            for (let j = 0; j < newRow.length - 1; j++) {
                if (newRow[j] === newRow[j + 1]) {
                    newRow[j] = modifyMergeResult(newRow[j]);
                    newRow.splice(j + 1, 1);
                    newRow.push(0);
                }
            }
            while (newRow.length < boardSize) {
                newRow.push(0);
            }
            return newRow;
        };

        for (let i = 0; i < boardSize; i++) {
            let row;
            if (direction === 'right' || direction === 'left') {
                row = board[i];
            } else {
                row = board.map(r => r[i]);
            }

            if (direction === 'right' || direction === 'down') {
                row = row.reverse();
            }

            const newRow = moveRow(row);

            if (direction === 'right' || direction === 'down') {
                newRow.reverse();
            }

            for (let j = 0; j < boardSize; j++) {
                if (direction === 'right' || direction === 'left') {
                    if (board[i][j] !== newRow[j]) {
                        moved = true;
                    }
                    board[i][j] = newRow[j];
                } else {
                    if (board[j][i] !== newRow[j]) {
                        moved = true;
                    }
                    board[j][i] = newRow[j];
                }
            }
        }

        if (moved) {
            addRandomTile();
            updateBoard();
        }
    }

    // Handle key events for moving tiles
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    });

    // Handle on-screen arrow buttons
    document.getElementById('up').addEventListener('click', () => move('up'));
    document.getElementById('down').addEventListener('click', () => move('down'));
    document.getElementById('left').addEventListener('click', () => move('left'));
    document.getElementById('right').addEventListener('click', () => move('right'));

    // Initialize the game
    initializeBoard();
});
