//GLOBAL section

let animals = ['cat', 'duck', 'frog', 'pig', 'dog', 'horse'];
let MAX_ANIMALS = localStorage.getItem('MAX_ANIMALS')  ?? 3;


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
function showOverlay(text) {
    overlay.style.display = 'block';
    contentDiv.innerHTML = text;
}
function hideOverlay() {
    overlay.style.display = 'none';
}


//LOCAL section
let play_animals = animals.slice(0,MAX_ANIMALS);
let total_attemps = 0;
let success_attemps=0;
let cell_selection =[]; //select
let cell_highlight; // main

let highlightCell = document.createElement('div');
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');


//class representing animal cell
class cellClass{
    constructor(name, image, sound){
        this.name = name;
        this.displayed = false;
        this.image = image;
        this.sound = sound;
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
    getSound(){
        return this.sound;
    }

    playSound() {
        const sound = new Audio(this.getSound());
        sound.play();
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createHighlight(){
    cell_highlight = null;
    shuffleArray(play_animals);
    let randomIndex = Math.floor(Math.random() * play_animals.length);
    const image = addImage(play_animals[randomIndex]);
    cell_highlight = new cellClass(play_animals[randomIndex],  image, "../sounds/" + play_animals[randomIndex] + ".mp3");
}

function createSelection(){
    cell_selection = play_animals.map((cellName) => {
        const image = addImage(cellName);
        image.classList.add('anim_img')
        return new cellClass(cellName, image);
    });

    shuffleArray(cell_selection);
}

function createCells() {
    createHighlight();

    createSelection();
}

function addImage(name){
    let img = document.createElement("img");
    img.src = "../png/" + name + ".png" ;
    return img;
}

function playSoundGame() {
    highlightCell = document.createElement('div');
    highlightCell.classList.add('cell');

    const image = cell_highlight.getImage(); //creating a black view of guessing animal
    image.classList.toggle('blackout');
    image.classList.add('anim_img');

    highlightCell.appendChild(image); // getting an image of guessing animal
    main_section.appendChild(highlightCell);
    cell_highlight.setDisplayed(true);




    //click = sound
    highlightCell.addEventListener('click', function() {
        cell_highlight.playSound();
    });

    // Placing select animals
    for(let i = 0; i < MAX_ANIMALS; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        select_section.appendChild(cell);
        cell_selection[i].setDisplayed(true);
        cell_selection[i].selected = false;
        cell_selection[i].element = cell;

        // choose listener then true/false logic, reset only for correct answer
        cell.addEventListener('click', function() {
            if(cell_selection[i].getName() === cell_highlight.getName()){
                showOverlay("Success! That was " + cell_selection[i].getName() + "!");
                success_attemps++;
                resetSoundGame();
            } else {
                showOverlay("Missed, let's try again.");
            }
            total_attemps++;

        });
    }
}
function resetSoundGame() {
    //returning styles of guessing animal
    const image = cell_highlight.getImage();
    image.classList.toggle('blackout');

    // clearing sections
    main_section.innerHTML = '';
    select_section.innerHTML = '';

    // shuffle arr cells
    shuffleArray(cell_selection);
    createHighlight();

    // new round representing
    playSoundGame();
}



createOverlay();
createCells();
playSoundGame();

//starting game
