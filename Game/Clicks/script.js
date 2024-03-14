let leftAnimalImages = ['../PNG/cat1.png', '../PNG/duck1.png', '../PNG/frog1.png'];
let rightAnimalImages = ['../PNG/cat2.png', '../PNG/duck2.png', '../PNG/frog2.png'];
let selectedLeftAnimal;
let gameContainer = document.getElementById('gameContainer');

function shuffleAnimals() {
    let currentIndex = leftAnimalImages.length;
    let temporaryValue, randomIndex;

    // Пока остаются элементы для перетасовки...
    while (currentIndex !== 0) {
        // Выбираем случайный оставшийся элемент...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Меняем текущий элемент с элементом на случайной позиции...
        temporaryValue = leftAnimalImages[currentIndex];
        leftAnimalImages[currentIndex] = leftAnimalImages[randomIndex];
        leftAnimalImages[randomIndex] = temporaryValue;

        temporaryValue = rightAnimalImages[currentIndex];
        rightAnimalImages[currentIndex] = rightAnimalImages[randomIndex];
        rightAnimalImages[randomIndex] = temporaryValue;
    }
}

function createAnimals() {
    shuffleAnimals();

    // Генерируем изображение левой половины в верхней части экрана
    let iconTopContainer = document.getElementById('iconTop');
    selectedLeftAnimal = leftAnimalImages[Math.floor(Math.random() * leftAnimalImages.length)];
    iconTopContainer.innerHTML = `<img src="${selectedLeftAnimal}" alt="Left Animal Image">`;

    // Генерируем уникальные изображения правых половинок в нижней части экрана
    let iconBottomContainer = document.getElementById('iconBottom');
    rightAnimalImages.forEach(animal => {
        const iconElement = document.createElement('img');
        iconElement.src = animal;
        iconElement.alt = 'Right Animal Image';
        iconElement.classList.add('icon');
        iconElement.addEventListener('click', () => {
            checkMatch(animal);
        });
        iconBottomContainer.appendChild(iconElement);
    });
}

function checkMatch(rightAnimal) {
    if (rightAnimal === getCorrespondingRightAnimal(selectedLeftAnimal)) {
        alert('Поздравляем! Вы нашли совпадение!');
        resetGame();
    } else {
        alert('Увы, это не совпадает. Попробуйте еще раз.');
    }
}

function getCorrespondingRightAnimal(leftAnimal) {
    // Ищем соответствующую правую половину изображения по имени левого изображения
    let index = leftAnimalImages.indexOf(leftAnimal);
    return rightAnimalImages[index];
}

function resetGame() {
    // Очищаем содержимое контейнеров
    let iconBottomContainer = document.getElementById('iconBottom');
    iconBottomContainer.innerHTML = '';
    let iconTopContainer = document.getElementById('iconTop');
    iconTopContainer.innerHTML = '';
    // Создаем игру заново
    createAnimals();
}

createAnimals();