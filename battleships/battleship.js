let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },

    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");

let model = {
    // размер сетки игрового поля
    boardSize: 7,
    // количество кораблей в игре
    numShips: 3,
    // длина каждого корабля в клетках
    shipLength: 3,
    //количество потопленных кораблей
    shipSunk: 0,
    // позиции кораблей и координаты попаданий
    ships: [
        { locations: ['06', '16', '26'], hits: ['', '', ''] },
        { locations: ['24', '34', '44'], hits: ['', '', ''] },
        { locations: ['10', '11', '12'], hits: ['', '', ''] },
    ],
    /*
    Метод получает аргумент с координатами выстрела,
    перебирает все корабли и проверяет, пришлось ли
    попадание в очередной корабль.
     */
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('ПОПАЛ!');
                if (this.isSunk(ship)) {
                    view.displayMessage('ТЫ ПОТОПИЛ КОРАБЛЬ!');
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('ТЫ ПРОМАХНУЛСЯ!');
        return false;
    },
    /*
    Метод с именем isSunk получает объект корабля
    и возвращает true, если корабль потоплен, или false,
    если он еще держится на плаву.
    */
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");

/*
Контроллер должен получить координаты выстрела,
введенные пользователем, проверить их и передать объекту модели.
*/
function parseGuess(guess) {
    let boardLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
        alert('Введи координаты на доске!');
    } else {
        // извлекаем первый символ строки
        let firstChar = guess.charAt(0);
        // при помощи indexOf() получаем цифру в
        // диапозоне от 0 до 6, соответствующую букве
        let row = boardLetters.indexOf(firstChar);
        let column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert('Введенная тобой буква или цифра отсутствуют на доске!');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert('На доске нет таких координат!');
        } else {
            return row + column;
        }
        return null;
    }
}
// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));

let controller = {
    // количество выстрелов
    guesses: 0,
    // метод, получающий координаты в формате “A0"
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);

            if (hit && model.shipSunk === model.numShips) {
                view.displayMessage('Ты потопил все корабли за ' + this.guesses + ' попыток!')
            }
        }
    }
};
// controller.processGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");

function init() {
    // получаем ссылку на кнопку Fire по идентификатору кнопки
    let fireButton = document.getElementById('fireButton');
    // назначаем кнопке обработчик собития - функцию handleFireButton
    fireButton.onclick = handleFireButton;
    // ОБРАБОТКА НАЖАТИЯ КЛАВИШИ ENTER
    let guessInput = document.getElementById('guessInput');
    // добавляем новый обработчик событий для клавиши Enter
    guessInput.onkeypress = handleKeyPress;
}
// функция будет вызываться при каждом нажатии на кнопку Fire.
// Кнопка Fire! запускает обработку выстрела, но сами введенные данные содер-
// жатся в элементе формы “guessInput”. Для получения значения от формы можно
// обратиться к свойству value элемента input.
function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    // извлекаем данные, введенные пользователем.
    // Координаты хранятся в свойстве value элемента input.
    let guess = guessInput.value;
    // передаем координаты выстрела контроллеру
    controller.processGuess(guess);
    // очищаем строку пользовательского ввода
    guessInput.value = '';
}

function handleKeyPress(e) {
    let fireButton = document.getElementById('fireButton');
    // код клавиши Enter = 13
    if (e.code === 'Enter') {
        // метод click имитирует нажатие кнопки
        fireButton.click();
        // возвращаем false? чтобы форма не делала ничего лишнего
        return false;
    }
}

// браузер выполнит функцию init при полной загрузке страницы
window.onload = init;