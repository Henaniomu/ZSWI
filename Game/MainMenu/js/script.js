// const radioButtons = document.querySelectorAll('input[type="radio"][name="radio2"]');
document.addEventListener("DOMContentLoaded", () => {

    // let select1 = document.getElementById('selectGame1');
    let switchElements = document.querySelectorAll(".settings-group.horizontal input[type='checkbox']");

    switchElements.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            let switchId = this.id;
            let switchValue = this.checked ? '1' : '0';
            localStorage.setItem(switchId, switchValue);
        });
    });

    let radioButtons = document.querySelectorAll('.settings-group input[type="radio"]');
    // radioButtons.forEach(radioButton => {
    //     radioButton.addEventListener('change', () => {
    //         localStorage.setItem('MAX_ANIMALS', radioButton.value);
    //         // startGame();
    //     });
    // });
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            const maxAnimals = document.querySelector('input[name="radio1"]:checked').value;
            const max_rounds = document.querySelector('input[name="radio2"]:checked').value;
            localStorage.setItem('MAX_ANIMALS', maxAnimals);
            localStorage.setItem('MAX_ROUNDS', max_rounds);
            localStorage.setItem('numberOfAnimals', maxAnimals); //!!!!!!!!
            // startGame();
        });
    });

    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            const maxAnimals = document.querySelector('input[name="radio1"]:checked').value;
            const max_rounds = document.querySelector('input[name="radio2"]:checked').value;
            localStorage.setItem('MAX_ANIMALS', maxAnimals);
            localStorage.setItem('MAX_ROUNDS', max_rounds);
            localStorage.setItem('numberOfAnimals', maxAnimals);
        }
    });

    window.addEventListener('load', function() {
        let switchElements = document.querySelectorAll('.horizontal-switches input[type="checkbox"]');

        // Сохранение состояния переключателей при загрузке страницы
        switchElements.forEach(function(checkbox) {
            let switchId = checkbox.id;
            let switchValue = checkbox.checked ? '1' : '0';
            localStorage.setItem(switchId, switchValue);
        });

        // Обработчик события изменения состояния переключателей
        switchElements.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                let switchId = this.id;
                let switchValue = this.checked ? '1' : '0';
                localStorage.setItem(switchId, switchValue);
            });
        });
    });


    let button3 = document.getElementById('button3');
    button3.addEventListener('click', () => {
        startGame3();
    });


    let button2 = document.getElementById('button2');
    button2.addEventListener('click', () => {
        //TODO: game2
        startGame2();
    });

    let button1 = document.getElementById('button1');
    button1.addEventListener('click', () => {
        //TODO: game3
        startGame1();
    });


    function startGame3() {
        overrideMenu();
        loadGameScript3();
    }

    function startGame2() {
        overrideMenu();
        loadGameScript2();
    }

    function startGame1() {
        overrideMenu();
        loadGameScript1();
    }


    function overrideMenu() {
        document.querySelector('.menu').innerHTML = `
            <div id="icons">
                <img src="../pictures/icons/home.png" name="home" onclick="location.reload();">
                <img src="../pictures/icons/tip.png" name="tip" onclick="guess_helper()">
                <img src="../pictures/icons/warn.png" name="warn">
            </div>
            <div class="contain">
                <div class="main_section" id="main_section"></div>
                <div class="select_section" id="select_section"></div>
                <div class="overlay" id="overlay"></div>
                <div class="overlay" id="overlayEnd"></div>
            </div>
            <div class="background-image">
<!--                <img src="../pictures/bgFullHD.png" alt="">-->
            </div>`;
    }

    function loadGameScript3() {
        let scriptElement = document.createElement('script');
        // scriptElement.src = "../js/game.js";
        scriptElement.src = "../../SoundClick/game.js";
        document.body.appendChild(scriptElement);
    }

    function loadGameScript2() {
        let scriptElement = document.createElement('script');
        // scriptElement.src = "../js/script_game2.js";
        scriptElement.src = "../../Animals/script.js";
        document.body.appendChild(scriptElement);
    }

    function loadGameScript1() {
        let scriptElement = document.createElement('script');
        // scriptElement.src = "../js/script_game1.js";
        scriptElement.src = "../../Clicks/game.js";
        document.body.appendChild(scriptElement);
    }
});
