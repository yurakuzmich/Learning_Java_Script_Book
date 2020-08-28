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

model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");