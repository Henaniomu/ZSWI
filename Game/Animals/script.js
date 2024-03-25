let cells = ['cat', 'duck', 'frog', 'goat', 'horse', 'pig', 'rabbit', 'turkey', 'dachshund']; //Default array with all the animals

let numberOfimages = 9; //amount of images the game will used

let sizeOfSelect = 4; //size of the select section

let total_attemps = 0 ;
let success_attemps=0;


let cell_selection =[]; //cells that exists in the select section
let cell_highlight =[]; //cells that exists in the highlight section
shuffleArray(cells);
let cell1 = cells.slice(0, numberOfimages); //cell_selection
let cell2 = cells.slice(0, numberOfimages); //cell_highlight

let highlightCell = document.createElement('div'); //this variable is used to display the highlight image and as a parent
let rightInnerDiv; //displays the image from the dragged cell
let leftInnerDiv; //displays the highlight
let newDiv; //child of highlightCell and parent of rightInnerDiv and leftInnerDiv
let tempName; //stores the name of the highlightCell

let selectedCellName; //stores the name of selected cell
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');

let increaseButton = document.getElementById("increase")
let decreaseButton = document.getElementById("decrease")

increaseButton.addEventListener("click", slideRight);
decreaseButton.addEventListener("click", slideLeft);

leftInnerDiv = document.createElement('div'); // leftInnerDiv contains the image of the highlightCell
leftInnerDiv.classList.add('cell');

leftInnerDiv.addEventListener('dragover', dragOver);
leftInnerDiv.addEventListener('dragenter', dragEnter);
leftInnerDiv.addEventListener('drop', drop);

rightInnerDiv = document.createElement('div'); // rightInnerDiv contains the image of the dragged cell from the select section
rightInnerDiv.classList.add('cell');

rightInnerDiv.addEventListener('dragover', dragOver);
rightInnerDiv.addEventListener('dragenter', dragEnter);
rightInnerDiv.addEventListener('drop', drop);

newDiv = document.createElement('div'); // newDiv contains the leftInnerDiv and the RightInnerDiv


class cellClass{
    constructor(name, side, image){
        this.name = name;
        this.side = side;
        this.displayed = false;
        this.image = image;
    }

    // displayed variable for
    // cell_highlight is used to declare if the cell is displayed at least once
    // cell_selection is used to declare if the cell should be displayed on the screen
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

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    //slides the select section to the right
    slideR(){
        let current = this.head;
        let count = 0;
        let countDis = 0;
        let firstDisplayed = false;
        let ableToSlide = false;
        let specialCase = false;

        if(this.head == null)
            return;

        while(current){
            if(current.data.getDisplayed())
                countDis++;
            if(countDis === sizeOfSelect)
                if(current.next !== null) {
                    ableToSlide = true;
                    break;
                }
            if(current.next)
                if(!current.next.data.getDisplayed() && countDis === sizeOfSelect - 1){
                    specialCase = true;
                    break;
                }
            current = current.next;
        }
        if(!ableToSlide && !specialCase)
            return false;
        current = this.head;
        if(specialCase){
            while(current){
                if(current.data.getDisplayed() && !firstDisplayed){
                    firstDisplayed = true;
                    count = 0;
                }
                if(count === sizeOfSelect - 1 && firstDisplayed){
                    current.data.setDisplayed(true);
                    list.updateDisplay();
                    return true;
                }
                count++;
                current = current.next;
            }
        }
        while (current){
            if(current.data.displayed && !firstDisplayed){
                current.data.setDisplayed(false);
                count = 0;
                firstDisplayed = true;
            }
            if(count === sizeOfSelect && firstDisplayed){
                current.data.setDisplayed(true);
                list.updateDisplay();

                return true;
            }
            count++;
            current = current.next;
        }
        list.updateDisplay();
    }
    //slides the select section to the left
    slideL() {
        let current = this.head;
        let count = 0;
        let found = false;
        if(this.head == null)
            return;
        while (current) {
            if (this.head.data.displayed && !count)
                return;
            if(current.data.getDisplayed() && !found){ // find the first cell that is displayed
                count = 0;
                found = true;
            }

            if (count === sizeOfSelect - 1 && found) {
                current.data.setDisplayed(false);
                break;
            }
            count++;
            current = current.next;
        }

        current = this.head;
        while(!current.data.getDisplayed()){
            if(current.next.data.getDisplayed())
                current.data.setDisplayed(true);
            current = current.next;
        }

        list.updateDisplay();
    }
    //displays the another cell if exists after the removal
    getMaxOfAvailable(){
        if(list.slideR()) {
        }
        else {
            list.slideL();
        }
    }
    //updates the display according to displayed variable
    updateDisplay(){

        let current = this.head;
        while (current) {
            if (current.data.displayed) {
                current.data.element.style.display = "inline-block";
            } else {
                current.data.element.style.display = "none";
            }
            current = current.next;
        }
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
    }

    insertLast(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Remove the first node
    removeFirst() {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
    }

    // Remove node at a specific index
    removeAt(name) {

        // list.printList()

        if(this.head == null)
            return;

        if (this.head.data.getName() === name) {
            this.removeFirst();
            list.updateDisplay();
            return;
        }

        let current = this.head;
        let previous = null;

        while(current){
            previous = current;
            current = current.next;
            if(name === current.data.getName())
                break;
        }

        if (current) {
            previous.next = current.next;
        }
        // list.updateDisplay();
    }

    //Fills the list
    fillTheList(array){
        list.insertFirst(array[0]);
        for(let i = 1; i < numberOfimages; i++){
            list.insertLast(array[i]);
        }
        list.updateDisplay();
        // list.printList();
    }

    //resets the list
    reset(){
        this.head = null;
    }

    // Print the list
    printList() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

const list = new LinkedList(); // list is used to dynamically display and remove images from the select section

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

/**
 * @param name of the cell
 * @param side of the cell 1(front) or 2(back).
 * @returns the path of the image
 */
function addImage(name, side){
    let img = document.createElement("img");
    img.src = "../png/" + name + side + ".png" ;

    // img.style.width = 200 + "px";
    // img.style.height = 300 + "px";
    img = imageResize(name, side, img);
    return img;
}

function imageResize(name,side , img){
    switch(name+side){
        case 'horse1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'horse2':
            img.style.width = 200 + "px";
            img.style.height = 200 + "px";
            break;
        case 'pig1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'pig2':
            img.style.width = 200 + "px";
            img.style.height = 235 + "px";
            break;
        case 'rabbit1':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'rabbit2':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'dachshund1':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'dachshund2':
            img.style.width = 200 + "px";
            img.style.height = 170 + "px";
            break;
        case 'goat1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'goat2':
            img.style.width = 200 + "px";
            img.style.height = 190 + "px";
            break;
        case 'turkey1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'turkey2':
            img.style.width = 200 + "px";
            img.style.height = 200 + "px";
            break;

        case 'duck2':
            img.style.height = 195 + "px";
            break;

    }
    return img;
}

/**
 * when the drag starts the selectCellName gets the textContext of the div in the select section
 * @param event
 */
function dragStart(event) {
    const cellDiv = event.target.closest('.cell');
    if (cellDiv) {
        event.dataTransfer.setData('text/plain', cellDiv.textContent.trim());
        selectedCellName = cellDiv.textContent.trim();
    }
}

function dragOver(event) {
    event.preventDefault();
}

added = false;

/**
 * when the dragged cell from select section enters the highlightCell, the highlightCell hides and the newDiv appears
 * @param event
 */
function dragEnter(event) {
    event.preventDefault();

     if (!added) {
        tempName = highlightCell.textContent;
        leftInnerDiv.textContent = tempName;
        leftInnerDiv.appendChild(addImage(tempName, 1));

        rightInnerDiv.textContent = tempName;
        rightInnerDiv.appendChild(addImage(selectedCellName, 2));

        rightInnerDiv.style.margin = "0px" ;
        leftInnerDiv.style.margin = "0px" ;
        rightInnerDiv.style.marginBottom = "10px" ;
        leftInnerDiv.style.marginBottom = "10px" ;

        newDiv.appendChild(leftInnerDiv);
        newDiv.appendChild(rightInnerDiv);

        main_section.removeChild(highlightCell);
        main_section.appendChild(newDiv);
        added = true;
     }
}

/**
 * when the dragged cell leaves the highlight section the highlightCell returns and the newDiv is removed
 */
newDiv.addEventListener('dragleave', (event) => {
    if (event.target !== newDiv) return;
        main_section.removeChild(newDiv);
        highlightCell.textContent = tempName;
        highlightCell.appendChild(addImage(tempName, 1));
        highlightCell.addEventListener('drop', drop);
        main_section.appendChild(highlightCell);
        added = false;
});

/**
 * after drop newDiv is removed
 * highlightCell is replaced in the main section
 * calls the control
 * @param event
 */
function drop(event) {
    event.preventDefault();
        main_section.removeChild(newDiv);
        highlightCell.textContent = tempName;
        highlightCell.appendChild(addImage(tempName, 1));
        highlightCell.addEventListener('drop', drop);
        main_section.appendChild(highlightCell);
        added = false;

    const dropTarget = tempName;
    if (!dropTarget) return;

    control(dropTarget === selectedCellName);

}

/**
 * decides if there will be a new highlight cell or the end of the round
 * @param result is the compare of the highlighted and the selected after the drop
 */
function control(result){

    if(result){
        success_attemps++;
        index = getValidIndex(cell_highlight);
        setHighlight(index);
        updateSelectSection();
    }
    else{
        showOverlay("Try again");
    }

    total_attemps++;
    if(total_attemps === numberOfimages){
        if(success_attemps === numberOfimages){
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
    for (let i = 0; i < numberOfimages; i++) {
        if(cell_selection[i].getName() === selectedCellName){
            cell_selection[i].selected = true;
            cell_selection[i].element.style.display = "none";
            list.removeAt(cell_selection[i].name);
            list.getMaxOfAvailable();
            break;
        }
    }
}

function slideRight(){
    list.slideR();
}
function slideLeft(){
    list.slideL();
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
 * used (only) for the beginning
 * initializes highlightCell
 * initializes select section
 */
function setFirstRound(){

    highlightCell.classList.add('cell');
    highlightCell.textContent = cell_highlight[0].getName();
    highlightCell.appendChild(cell_highlight[0].getImage());
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);

    highlightCell.addEventListener('dragenter', dragEnter);

    for(let i = 0; i < numberOfimages; i++){

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('dragstart', dragStart);
        select_section.appendChild(cell);
        cell_selection[i].selected = false; //selected indicates if the cell has been dragged and dropped
        cell_selection[i].element = cell;
        if(i < sizeOfSelect){
            cell_selection[i].setDisplayed(true);
        }
        //fills the list
        if(!i){
            list.insertFirst(cell_selection[i]);
        }
        else{
            list.insertLast(cell_selection[i]);
        }

    }
    list.updateDisplay();
}

/**
 * reset is used after each round
 */
function reset() {
    total_attemps = 0;
    success_attemps = 0;
    let setTheFirst = 0; // used as flag for the first images to be displayed in the select section
    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
    cell_highlight.forEach(variable => {
        variable.setDisplayed(false)
        variable.displayed = false;
    });
    cell_selection.forEach((variable, index) => {
        variable.selected = false;
        // const cellElement = document.querySelectorAll('#select_section .cell')[index];
        // cellElement.style.display = "inline-block";
        if(setTheFirst < sizeOfSelect){
            variable.setDisplayed(true);
        }
        else
            variable.setDisplayed(false);

        setTheFirst++;
    });


    // setHighlight(0);
    // cell_highlight[0].displayed = true;
    list.reset();
    // list.fillTheList(cell_selection);

    setFirstRound(); //is called to synchronize the list !

}

//show result on screen
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