'use strict';

/*
 * gomoku.model
 *
 * Модель ни о ком ничего не знает, только рассылает оповещения, без понимания, кто её слушает
 *
 * */

G.Model = function () {

    var config = {};
    var typeStep = 'x';

    // Основной массив с данными поля
    var field = [];


    var modelChangedSubject = G.makeObservableSubject();

    function refresh(ev, data) {
        modelChangedSubject.notifyObservers(ev, data);
    }

    function setGameData(data) {
        config = data;

        if (data.opponent === 'man') {
            delete  config.type;
        }

        for (var i = 0; i < config.size * config.size; i++) {
            field.push(' ');
        }
    }

    function getGameData() {
        return config
    }

    function toggleTypeStep() {
        if (typeStep === 'x') {
            typeStep = 'o';
        } else {
            typeStep = 'x';
        }

        modelChangedSubject.notifyObservers({
            type: 'changeType',
            newType: typeStep
        });
    }

    function moveMan(numEl) {
        var idNum = numEl.replace('el', '');
        if (field[idNum] == ' ' && typeStep !== 'undefined') {
            field[idNum] = typeStep;
            modelChangedSubject.notifyObservers({
                type: 'gameLoop',
                numFieldEl: idNum,
                typeMove: typeStep
            });
            checkWin(field);
            toggleTypeStep();
        } else {
            return false;
        }
    }

    function movePC() {

    }


    function move(ev) {
        var numEl = $(ev.target).attr('id');
        switch (config.opponent) {
            case 'man':
                moveMan(numEl);
                break;
            case 'pc':
                movePC();
                break;
        }
    }

    function win(){
        console.log('gameWin')
        modelChangedSubject.notifyObservers({
            type: 'gameWin',
            winnerType: typeStep
        });
    }

    /*
     * Приватный метод checkWin
     *
     * Метод проверяет не победил ли кто случайно
     *
     * Возвращает true если кто-то победил
     * Возвращает false если никто не победил
     *
     *
     * */

    function checkWin(field) {
        var winRule = 5;
        var count = 0;

        for (var row = 0; row < config.size; row++) {
            for (var col = 0; col < config.size; col++) {
                if (getElementData(field, row, col) != ' ') {

                    // Проверяем победу по горизонтали
                    if (col <= config.size - winRule) {
                        count = 1;
                        while (getElementData(field, row, col) == getElementData(field, row, col + count)) {
                            count += 1;
                            if (count >= winRule) {
                                win();
                                return true;
                            }
                        }
                    }

                    // Проверяем победу по вертикали
                    if (row <= config.size - winRule) {

                        // |
                        count = 1;
                        while (getElementData(field, row, col) == getElementData(field, row + count, col)) {
                            count += 1;
                            if (count >= winRule) {
                                win();
                                return true;
                            }
                        }

                        // \

                        if (col <= config.size - winRule) {
                            count = 1;
                            while (getElementData(field, row, col) == getElementData(field, row + count, col + count)) {
                                count += 1;
                                if (count >= winRule) {
                                    win();
                                    return true;
                                }
                            }
                        }

                        // /

                        if (col <= config.size - winRule) {
                            count = 1;
                            while (getElementData(field, row, col) == getElementData(field, row + count, col - count))
                                count += 1;
                            if (count >= winRule) {
                                win();
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;

    }



    function getElementData(field, row, col) {
        if (0 <= row && row < config.size && 0 <= col && col < config.size) {
            return field[row * config.size + col];
        }
    }

    return {
        modelChangedSubject: modelChangedSubject,
        getGameData: getGameData,
        setGameData: setGameData,
        checkWin: checkWin,
        refresh: refresh,
        move: move
    }
};