let cells = ['cat', 'duck', 'frog'];

let cell1 = cells.slice();
let cell2 = cells.slice();

let selectedCellName;
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');

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
        addImage(cell, 2);

        cell.draggable = true;
        cell.addEventListener('dragstart', dragStart);
        select_section.appendChild(cell);
    });

    cell2.forEach((cellName) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellName;
        addImage(cell, 1);

        main_section.appendChild(cell);
    });
}

function addImage(div, side){
    let img = document.createElement("img");
    img.src = "../png/" + div.textContent + side + ".png" ;
    div.appendChild(img);
}



function dragStart(event) {
    const cellDiv = event.target.closest('.cell');
    if (cellDiv) {
        event.dataTransfer.setData('text/plain', cellDiv.textContent.trim());
        selectedCellName = cellDiv.textContent.trim();
    }
}

main_section.addEventListener('dragover', dragOver);
main_section.addEventListener('dragenter', dragEnter);
main_section.addEventListener('dragleave', dragLeave);
main_section.addEventListener('drop', drop);

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
    const dropTarget = event.target.closest('.cell'); 
    if (!dropTarget) return; 

    const dropData = dropTarget.textContent.trim();

    if (dropData === selectedCellName) {
        showOverlay("Success");
    } else {
        showOverlay("Failure");
    }
}


createCells();



const overlay = document.getElementById('overlay');
const closeButton = document.createElement('span');
closeButton.textContent = '×'; 
closeButton.classList.add('close-button');
overlay.appendChild(closeButton);
const contentDiv = document.createElement('div');
contentDiv.classList.add('message');
overlay.appendChild(contentDiv);

function showOverlay(text) {
    overlay.style.display = 'block';
    contentDiv.innerHTML = text;
}

function hideOverlay() {
  overlay.style.display = 'none';
}

closeButton.addEventListener('click', hideOverlay);