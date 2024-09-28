const puzzleBoard = document.getElementById('puzzle-board');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
let tiles = [];
let emptyTile = { row: 2, col: 2 };

const initialTiles = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];

function shufflePuzzle() {
    let moves = 100;
    for (let i = 0; i < moves; i++) {
        const neighbors = getNeighbors(emptyTile.row, emptyTile.col);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        moveTile(randomNeighbor.row, randomNeighbor.col, false);
    }
}

function getNeighbors(row, col) {
    const neighbors = [];
    if (row > 0) neighbors.push({ row: row - 1, col });
    if (row < 2) neighbors.push({ row: row + 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (col < 2) neighbors.push({ row, col: col + 1 });
    return neighbors;
}

function initPuzzle() {
    tiles = JSON.parse(JSON.stringify(initialTiles));
    emptyTile = { row: 2, col: 2 };
    shufflePuzzle();
    renderBoard();
    message.innerText = '';
}

function renderBoard() {
    puzzleBoard.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (tiles[row][col] === null) {
                tile.classList.add('empty');
            } 
            else {
                tile.innerText = tiles[row][col];
                tile.addEventListener('click', () => moveTile(row, col, true));
            }
            puzzleBoard.appendChild(tile);
        }
    }
}

function moveTile(row, col, checkWin = true) {
    if (isAdjacent(row, col)) {
        tiles[emptyTile.row][emptyTile.col] = tiles[row][col];
        tiles[row][col] = null;
        emptyTile = { row, col };
        renderBoard();
        if (checkWin && checkWinCondition()) {
            displayWinMessage();
        }
    }
}

function isAdjacent(row, col) {
    const rowDiff = Math.abs(row - emptyTile.row);
    const colDiff = Math.abs(col - emptyTile.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function checkWinCondition() {
    const winningState = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, null]
    ];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (tiles[row][col] !== winningState[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function displayWinMessage() {
    message.innerText = 'You Win';
}

restartButton.addEventListener('click', () => {
    initPuzzle();
});

initPuzzle();