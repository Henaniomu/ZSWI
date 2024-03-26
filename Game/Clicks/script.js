let cells = ['cat', 'duck', 'frog'];

let numberOfImages = 3;
let total_attempts = 0;
let success_attempts= 0;


let cell_selection =[]; //select
let cell_highlight =[]; //main
let cell1 = cells.slice(0, numberOfImages); // cell selection
let cell2 = cells.slice(0, numberOfImages); // cell highlight

let highlightCell;// = document.createElement('div');

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

function  addImage(name, side){
    let img = document.createElement("img");
    img.src = "../png/" + name + side + ".png" ;
    return img;
}


function click(name) {

    control(name === highlightCell.textContent.trim());

}

function control(result){

    let index;
    if (result) {
        success_attempts++;
        index = getValidIndex(cell_highlight);
        setHighlight(index);
    } else {
        showOverlay("Try again");
    }

    total_attempts++;
    if(total_attempts === numberOfImages){
        if(success_attempts === numberOfImages){
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
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);

    for(let i = 0; i < numberOfImages; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('click', () => {
            click(cell.textContent);
        });
        select_section.appendChild(cell);
        cell_selection[i].setDisplayed(true);

    }
}
function reset(){
    total_attempts = 0;
    success_attempts = 0;

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







// let leftAnimalImages = ['../PNG/cat1.png', '../PNG/duck1.png', '../PNG/frog1.png'];
// let rightAnimalImages = ['../PNG/cat2.png', '../PNG/duck2.png', '../PNG/frog2.png'];
// let selectedLeftAnimal;
//
// function shuffleAnimals() {
//     let currentIndex = leftAnimalImages.length;
//     let temporaryValue, randomIndex;
//
//     // Пока остаются элементы для перетасовки...
//     while (currentIndex !== 0) {
//         // Выбираем случайный оставшийся элемент...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//
//         // Меняем текущий элемент с элементом на случайной позиции...
//         temporaryValue = leftAnimalImages[currentIndex];
//         leftAnimalImages[currentIndex] = leftAnimalImages[randomIndex];
//         leftAnimalImages[randomIndex] = temporaryValue;
//
//         temporaryValue = rightAnimalImages[currentIndex];
//         rightAnimalImages[currentIndex] = rightAnimalImages[randomIndex];
//         rightAnimalImages[randomIndex] = temporaryValue;
//     }
// }
//
// function createAnimals() {
//     shuffleAnimals();
//
//     // Генерируем изображение левой половины в верхней части экрана
//     let iconTopContainer = document.getElementById('main_section');
//     selectedLeftAnimal = leftAnimalImages[Math.floor(Math.random() * leftAnimalImages.length)];
//     iconTopContainer.innerHTML = `<img src="${selectedLeftAnimal}" alt="Left Animal Image">`;
//
//     // Генерируем уникальные изображения правых половинок в нижней части экрана
//     let iconBottomContainer = document.getElementById('select_section');
//     rightAnimalImages.forEach(animal => {
//         const iconElement = document.createElement('img');
//         iconElement.src = animal;
//         iconElement.alt = 'Right Animal Image';
//         iconElement.classList.add('icon');
//         iconElement.addEventListener('click', () => {
//             checkMatch(animal);
//         });
//         iconBottomContainer.appendChild(iconElement);
//     });
// }
//
// function checkMatch(rightAnimal) {
//     if (rightAnimal === getCorrespondingRightAnimal(selectedLeftAnimal)) {
//         alert('Поздравляем! Вы нашли совпадение!');
//         resetGame();
//     } else {
//         alert('Увы, это не совпадает. Попробуйте еще раз.');
//     }
// }
//
// function getCorrespondingRightAnimal(leftAnimal) {
//     // Ищем соответствующую правую половину изображения по имени левого изображения
//     let index = leftAnimalImages.indexOf(leftAnimal);
//     return rightAnimalImages[index];
// }
//
// function resetGame() {
//     // Очищаем содержимое контейнеров
//     let iconBottomContainer = document.getElementById('select_section');
//     iconBottomContainer.innerHTML = '';
//     let iconTopContainer = document.getElementById('main_section');
//     iconTopContainer.innerHTML = '';
//     // Создаем игру заново
//     createAnimals();
// }
//
// createAnimals();