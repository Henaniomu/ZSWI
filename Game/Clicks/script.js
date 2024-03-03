let cells = ['Apple', 'Banana', 'Orange', 'Grapes', 'Watermelon', 'Pineapple', 'Strawberry', 'Blueberry', 'Cherry'];
let selectedCellName;
let gameContainer = document.getElementById('gameContainer');

function shuffleCells() {
    let duplicatedCells = cells.slice();
    cells = cells.concat(duplicatedCells);

    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    let firstRow = cells.slice(0, cells.length / 2);
    let secondRow = cells.slice(cells.length / 2);

    shuffleArray(firstRow);
    shuffleArray(secondRow);

    cells = firstRow.concat(secondRow);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCells() {
    shuffleCells();
    cells.forEach((cellName) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellName;
        cell.addEventListener('click', () => {
            checkMatch(cell);
        });
        gameContainer.appendChild(cell);
    });
}

function checkMatch(cell) {
    if (cell.textContent === selectedCellName) {
        alert('Success');
        resetGame();
    } else {
        alert('Failure');
    }
}

function resetGame() {
    gameContainer.innerHTML = '';
    cells = ['Apple', 'Banana', 'Orange', 'Grapes', 'Watermelon', 'Pineapple', 'Strawberry', 'Blueberry', 'Cherry'];
    createCells();
    selectRandomCell();
}

function selectRandomCell() {
    let randomIndex = Math.floor(Math.random() * cells.length);
    let allCells = document.querySelectorAll('.cell');
    selectedCellName = allCells[randomIndex].textContent;
    allCells[randomIndex].classList.add('selected');
}

createCells();
selectRandomCell();