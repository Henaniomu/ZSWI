let cells = ['cat', 'duck', 'frog'];

let numberOfimages = 3;
let total_attemps = 0;
let success_attemps=0;


let cell_selection =[]; //select
let cell_highlight =[]; //main
let cell1 = cells.slice(0, numberOfimages);
let cell2 = cells.slice(0, numberOfimages);

let highlightCell;// = document.createElement('div');

let selectedCellName;
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');


class cellClass{
    constructor(name, side, image){
        this.name = name;
        this.side = side;
        this.displayed = false;
        this.image = image;
    }

    setDisplayed(flag){
        this.displayed = flag;
    }
    getDisplayed(){
        return this.displayed;
    }
    getName(){
        return this.name;
    }
    getSide(){
        return this.side;
    }
    getImage(){
        return this.image;
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCells() {

    i = 0;
    cell1.forEach((cellName) => {
        const image = addImage(cellName, 1);
        const instance = new cellClass(cellName, 1, image);
        cell_highlight[i] = instance;
        i++;
    });

    i = 0;
    cell2.forEach((cellName) => {
        const image = addImage(cellName, 2);
        const instance = new cellClass(cellName, 2, image);
        cell_selection[i] = instance;
        i++;
    });

    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
}

function  addImage(name, side){
    let img = document.createElement("img");
    img.src = "../png/" + name + side + ".png" ;
    return img;
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

    control(dropData === selectedCellName);

}

function control(result){

    if(result){
        success_attemps++;
        index = getValidIndex(cell_highlight);
        setHighlight(index);   
    }
    else{
        showOverlay("Try again");
    }

    total_attemps++;
    if(total_attemps == numberOfimages){
        if(success_attemps == numberOfimages){
            showOverlay("Success");
            reset();
        }
        else{
            showOverlay("Failure");
            reset();
        }
    }


}

function getValidIndex(array) {
    for (let i = 0; i < array.length; i++) {
      if (!array[i].getDisplayed()) {
        return i;
      }
    }
}
function setHighlight(index){
    
    if (index >= 0 && index < cell_highlight.length) {
        highlightCell.textContent = cell_highlight[index].getName();
        highlightCell.appendChild(cell_highlight[index].getImage());
        cell_highlight[index].setDisplayed(true);
    }
}
function setFirstRound(){
    
    highlightCell = document.createElement('div');
    highlightCell.classList.add('cell');
    highlightCell.textContent = cell_highlight[0].getName();
    highlightCell.appendChild(cell_highlight[0].getImage());
    highlightCell.addEventListener('dragstart', dragStart);
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);
    
    for(i = 0; i < numberOfimages; i++){
        
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('dragstart', dragStart);
        select_section.appendChild(cell);
        cell_selection[i].setDisplayed(true);
        
    }
}
function reset(){
    total_attemps = 0;
    success_attemps = 0;

    cell_highlight.forEach(variable=>{
        variable.setDisplayed(false);
    });
    cell_selection.forEach(variable=>{
        variable.setDisplayed(false);
    });

    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
}



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


createCells();
setFirstRound();
