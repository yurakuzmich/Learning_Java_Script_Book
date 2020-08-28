var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },

    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        var cell = document.getElementById(location);
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

var model = {
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
    ]
};
