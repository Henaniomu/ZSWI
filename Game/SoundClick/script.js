document.addEventListener("DOMContentLoaded", () => {

    let slider = document.getElementById('mySlider');
    let output = document.getElementById('sliderValue');

    slider.value = localStorage.getItem('MAX_ROUNDS') ?? 4;
    output.textContent = slider.value;

    slider.addEventListener('input', function () {
        output.textContent = slider.value;
        localStorage.setItem('MAX_ROUNDS', slider.value);
    });

    let button1 = document.getElementById('button1');
    let select1 = document.getElementById('selectGame1');
    button1.addEventListener('click', () => {
        localStorage.setItem('MAX_ANIMALS', select1.value);
        startGame();
    });

    let button2 = document.getElementById('button2');
    button2.addEventListener('click', () => {
        //TODO: game2
    });

    let button3 = document.getElementById('button3');
    button3.addEventListener('click', () => {
        //TODO: game3
    });

    function startGame() {
        overrideMenu();
        loadGameScript();
    }

    function overrideMenu() {
        document.querySelector('.menu').innerHTML = `
            <div class="container">
                <div class="main_section" id="main_section"></div>
                <div class="select_section" id="select_section"></div>
                <div class="overlay" id="overlay"></div>
                <div class="overlay" id="overlayEnd"></div>
                <button class="in_game_button menu_button" onclick="returnMenu()"> <- Menu</button>
                <button class="in_game_button guess_button" onclick="guessHelper()">Need Help!</button>
            </div>`;
    }

    function loadGameScript() {
        let scriptElement = document.createElement('script');
        scriptElement.src = "game.js";
        document.body.appendChild(scriptElement);
    }
});



