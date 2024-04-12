//      GLOBAL
let animals = ['cat', 'duck', 'frog', 'goat', 'horse', 'pig', 'rabbit', 'turkey', 'dachshund']; //Default array with all the animals
let MAX_ANIMALS = localStorage.getItem('MAX_ANIMALS')  ?? 3;
let MAX_ROUNDS = localStorage.getItem('MAX_ROUNDS') ?? -1;
let INFINITY_GAME = localStorage.getItem('INFINITY_GAME') ?? true;
let COMPLEXITY_INC = localStorage.getItem('COMPLEXITY_INC') ?? false;

//show result on screen
const overlay = document.getElementById('overlay');
const closeButton = document.createElement('span');
const contentDiv = document.createElement('div');


function createOverlay(){
    closeButton.textContent = '×';
    closeButton.classList.add('close-button');
    overlay.appendChild(closeButton);

    contentDiv.classList.add('message');
    overlay.appendChild(contentDiv);
    closeButton.addEventListener('click', hideOverlay);
}
function returnMenu(){
    location.reload();
}
function showOverlay(text) {
    overlay.style.display = 'block';
    contentDiv.innerHTML = text;
}
function hideOverlay() {
    overlay.style.display = 'none';
}




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

    getName(){
        return this.name;
    }

    getImage(){
        return this.image;
    }
}


//      LOCAL
let total_attempts = 0;
let success_attempts= 0;
let ROUNDS_PLAYED = 0;
let WIN_STREAK = 0;

let cell_selection =[]; //animals that exists in the select section
let cell_highlight =[]; //animals that exists in the highlight section
shuffleArray(animals);
let cell1 = animals.slice(0, MAX_ANIMALS); //cell_selection
let cell2 = animals.slice(0, MAX_ANIMALS); //cell_highlight

let highlightCell = document.createElement('div'); //this variable is used to display the highlight image and as a parent

let selectedCellName; //stores the name of selected cell
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * creates an instance of cellClass for each cell and stores it in cell_highlight or cell_selection
 */
function createCells() {

    let i = 0;
    cell1.forEach((cellName) => {
        const image = addImage(cellName, 1);
        cell_highlight[i] = new cellClass(cellName, 1, image);
        i++;
    });

    i = 0;
    cell2.forEach((cellName) => {
        const image = addImage(cellName, 2);
        cell_selection[i] = new cellClass(cellName, 2, image);
        i++;
    });

    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
}

/**
 * @param name of the cell
 * @param side of the cell 1(front) or 2(back).
 * @returns the path of the image
 */
function addImage(name, side){
    let img = document.createElement("img");
    img.src = "../../png/" + name + side + ".png" ;

    img = imageResize(name, side, img);
    return img;
}

function imageResize(name,side , img){
    img.style.width = 250 + "px";
    img.style.height = 250 + "px";
    return img;
}


function click(name) {
    console.log(name)
    console.log(highlightCell.textContent.trim())
    control(name === highlightCell.textContent.trim());
}

function getCellElements() {
    const selectSection = document.getElementById('select_section');
    const cellElements = selectSection.querySelectorAll('.cell');
    console.log(Array.from(cellElements))
    return Array.from(cellElements);
}

function activateCheatClass(el) {
    el.classList.toggle('cheat');
}
function guess_helper(){
    let cells = getCellElements();
    cells.forEach(el => {
        if (el.textContent === cell_highlight[0].getName()){
            console.log("found")
            setTimeout(function() {
                activateCheatClass(el);
            }, 4000)
            activateCheatClass(el);
        }
    });
}

/**
 * decides if there will be a new highlight cell or the end of the round
 * @param result is the compare of the highlighted and the selected after the drop
 */
function control(result){

    let index;
    if (result) {
        success_attempts++;
        index = getValidIndex(cell_highlight);
        setHighlight(index);
        updateSelectSection();
    } else {
        showOverlay("Try again");
    }
    total_attempts++;
    console.log(success_attempts)
    console.log(total_attempts)
    console.log(MAX_ANIMALS)
    if(total_attempts == MAX_ANIMALS){
        console.log(total_attempts)
        if(success_attempts == MAX_ANIMALS){
            console.log(success_attempts)

            showOverlay("Success");
            reset();
        }
        else{
            showOverlay("Failure");
            reset();
        }
    }
}

/**
 * checks to find the cell from select section with same name as the cell which as been dragged and dropped
 * removes it from the display
 * calls removeAt to remove it from the list
 * calls getMaxOfAvailable to see if there are available images to displayed in places of the removed
 */
function updateSelectSection() {
    for (let i = 0; i < MAX_ANIMALS; i++) {
        if(cell_selection[i].getName() === selectedCellName) {
            cell_selection[i].selected = true;
        }
        if (cell_selection[i].selected) {
            cell_selection[i].element.style.display = "none";
        } else {
            cell_selection[i].element.style.display = "inline-block";
        }
    }
}

/**
 * this function searches for a cell that is not displayed and return the index
 * @param array
 * @returns {number} i is the valid index
 */
function getValidIndex(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].displayed) {
            return i;
        }
    }
}

/**
 * @param index indicates which cell from cell_highlight array will be displayed on the screen
 * new cell for highlightCell
 */
function setHighlight(index){
    if (index >= 0 && index < cell_highlight.length) {
        highlightCell.textContent = cell_highlight[index].getName();
        highlightCell.appendChild(cell_highlight[index].getImage());
        cell_highlight[index].setDisplayed(true);
        cell_highlight[index].displayed = true;
    }
}

/**
 * used to set the round
 * initializes highlightCell
 * initializes select section
 */
function setFirstRound(){

    highlightCell.classList.add('cell');
    highlightCell.textContent = cell_highlight[0].getName();
    highlightCell.appendChild(cell_highlight[0].getImage());
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);


    for(let i = 0; i < MAX_ANIMALS; i++){

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('click', () => {
            click(cell.textContent);
        });
        select_section.appendChild(cell);
        cell_selection[i].selected = false; //selected indicates if the cell has been dragged and dropped
        cell_selection[i].element = cell;
    }
}

/**
 * reset is used after each round
 */
function reset() {
    total_attempts = 0;
    success_attempts = 0;
    main_section.innerHTML = '';
    select_section.innerHTML = '';
    shuffleArray(animals);
    cell1 = animals.slice(0, MAX_ANIMALS);
    cell2 = animals.slice(0, MAX_ANIMALS);

    createCells();
    setFirstRound();
}
createOverlay();
createCells();
setFirstRound();