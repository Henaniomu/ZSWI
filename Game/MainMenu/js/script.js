// const radioButtons = document.querySelectorAll('input[type="radio"][name="radio2"]');

document.addEventListener("DOMContentLoaded", () => {
    let button3 = document.getElementById('button3');
    let select1 = document.getElementById('selectGame1');


    let radioButtons = document.querySelectorAll('.settings-group input[type="radio"]');
    
    button3.addEventListener('click', () => {
        startGame3();
    });
    // radioButtons.forEach(radioButton => {
    //     radioButton.addEventListener('change', () => {
    //         localStorage.setItem('MAX_ANIMALS', radioButton.value);
    //         // startGame();
    //     });
    // });
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            const maxAnimals = document.querySelector('input[name="radio1"]:checked').value;
            const maxKol = document.querySelector('input[name="radio2"]:checked').value;
            localStorage.setItem('MAX_ANIMALS', maxAnimals);
            localStorage.setItem('MAX_KOL', maxKol);
            localStorage.setItem('numberOfAnimals', maxAnimals);
            // startGame();
        });
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
        overrideMenu3();
        loadGameScript3();
    }

    function startGame2() {
        overrideMenu2();
        loadGameScript2();
    }

    function startGame1() {
        overrideMenu1();
        loadGameScript1();
    }


    function overrideMenu1() {
        document.querySelector('.menu').innerHTML = `
            <div id="icons">
                <img src="../pictures/icons/home.png" name="home" onclick="location.reload();">
                <img src="../pictures/icons/tip.png" name="tip">
                <img src="../pictures/icons/warn.png" name="warn">
            </div>
            <div class="container">
                <div class="main_section" id="main_section"></div>
                <!--    <button class="button" id="decrease"> - </button>-->
                <div class="select_section" id="select_section"></div>
                <!--    <button class="button" id="increase"> + </button>-->
                <div class="overlay" id="overlay"></div>
            </div>`;
    }

    function overrideMenu2() {
        document.querySelector('.menu').innerHTML = `
            <div id="icons">
                <img src="../pictures/icons/home.png" name="home" onclick="location.reload();">
                <img src="../pictures/icons/tip.png" name="tip">
                <img src="../pictures/icons/warn.png" name="warn">
            </div>


            <div class="container">
                <div class="main_section" id="main_section"></div>
            <!--    <button class="button" id="decrease"> - </button>-->
                <div class="select_section" id="select_section"></div>
            <!--    <button class="button" id="increase"> + </button>-->
                <div class="overlay" id="overlay"></div>
            </div>
<!--            <script src="script.js"></script>-->
            
<!--            <img src="../pictures/background/bgFullHD.png" alt="Описание изображения">-->
            `;
    }

    function overrideMenu3() {
        document.querySelector('.menu').innerHTML = `
            <div id="icons">
                <img src="../pictures/icons/home.png" name="home" onclick="location.reload();">
                <img src="../pictures/icons/tip.png" name="tip">
                <img src="../pictures/icons/warn.png" name="warn">
            </div>
            <div class="contain">
                <div class="main_section" id="main_section"></div>
                <div class="select_section" id="select_section"></div>
                <div class="overlay" id="overlay"></div>
            </div>
            <div class="background-image">
                <img src="../pictures/bgFullHD.png" alt="">
            </div>`;
    }

    function loadGameScript3() {
        let scriptElement = document.createElement('script');
        scriptElement.src = "../js/game.js";
        document.body.appendChild(scriptElement);
    }

    function loadGameScript2() {
        let scriptElement = document.createElement('script');
        scriptElement.src = "../js/script_game2.js";
        document.body.appendChild(scriptElement);
    }

    function loadGameScript1() {
        let scriptElement = document.createElement('script');
        scriptElement.src = "../js/script_game1.js";
        document.body.appendChild(scriptElement);
    }
});
