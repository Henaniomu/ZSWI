let cells = ['Horse', 'Cat', 'Dog', 'Monkey', 'Crocodile', 'Bear', 'Dolphine', 'Hippopotamos', 'Parrot'];

let cell1 = cells.slice();
let cell2 = cells.slice();

let selectedCellName;
let left = document.getElementById('left');
let right = document.getElementById('right');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCells() {
    shuffleArray(cell1);
    shuffleArray(cell2);
    
    cell1.forEach((cellName) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellName;
        cell.draggable = true;
        cell.addEventListener('dragstart', dragStart);
        left.appendChild(cell);
    });

    cell2.forEach((cellName) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellName;
        right.appendChild(cell);
    });
}



function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    selectedCellName = event.target.textContent;
}

right.addEventListener('dragover', dragOver);
right.addEventListener('dragenter', dragEnter);
right.addEventListener('dragleave', dragLeave);
right.addEventListener('drop', drop);

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave() {
}

function drop(event) {
    event.preventDefault();
    const dropData = event.target.innerHTML;

    if (dropData === selectedCellName) {
        alert('Success');
    } else {
        alert('Failure');
    }
}

createCells();
