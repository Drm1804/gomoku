'use strict';

/*
 * Модуль gomoku.view, отвечает за логику игры
 *
 * В приложение заложена концепция активной модели
 *
 * Предназначение:
 *   - работа с controller и view
 *   - хранение настроек игры
 *   - todo алгоритм AI
 *
 * */

gomoku.model = (function () {


    var field_size = 20; // todo сделать возможность смены

    var config = {};

    // Тип который ходит (x/o), по умолчанию x
    var typeStep = 'x';

    // Основной массив с данными поля
    var field = [];

    var jqMap = {};


    /*
     * Приватный метод toggleTypeStep(
     *
     * Метод меняет значение переменной typeStep
     *
     * */

    function toggleTypeStep() {
        if (typeStep === 'x') {
            typeStep = 'o';
        } else {
            typeStep = 'x';
        }
    }


    /*
     * Приватный метод getElementData
     *
     * Метод возвращает элемент, записанный в массиве
     *
     *
     * */

    function getElementData(field, row, col) {
        if (0 <= row && row < config.fieldSize && 0 <= col && col < config.fieldSize) {
            return field[row * config.fieldSize + col];
        }
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

        for (var row = 0; row < config.fieldSize; row++) {
            for (var col = 0; col < config.fieldSize; col++) {
                if (getElementData(field, row, col) != ' ') {

                    // Проверяем победу по горизонтали
                    if (col <= config.fieldSize - winRule) {
                        count = 1;
                        while (getElementData(field, row, col) == getElementData(field, row, col + count)) {
                            count += 1;
                            if (count >= winRule) {
                                console.log('Победа -');
                                return true;
                            }
                        }
                    }

                    // Проверяем победу по вертикали
                    if (row <= config.fieldSize - winRule) {

                        // |
                        count = 1;
                        while (getElementData(field, row, col) == getElementData(field, row + count, col)) {
                            count += 1;
                            if (count >= winRule) {
                                console.log('Победа по |');
                                return true;
                            }
                        }

                        // \

                        if (col <= config.fieldSize - winRule) {
                            count = 1;
                            while (getElementData(field, row, col) == getElementData(field, row + count, col + count)) {
                                count += 1;
                                if (count >= winRule) {
                                    console.log('Победа по \\ ');
                                    return true;
                                }
                            }
                        }

                        // /

                        if (col <= config.fieldSize - winRule) {
                            count = 1;
                            while (getElementData(field, row, col) == getElementData(field, row + count, col - count))
                                count += 1;
                            if (count >= winRule) {
                                console.log('Победа по / ');
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;

    }

    function setMove(id) {
        var idNum = id.replace('el', '');
        if (field[idNum] == ' ' && typeStep !== 'undefined') {
            field[idNum] = typeStep;
            gomoku.view.showMove(id, typeStep);
            checkWin(field);
            toggleTypeStep();
            // gomoku.controller.unbindClick(jqMap.$fieldEl);
        } else {
            return false;
        }
    }

    function initModule($field) {

        config.fieldSize = field_size;

        for (var i = 0; i < config.fieldSize * config.fieldSize; i++) {
            field.push(' ');
        }

        // Создавем поле
        gomoku.view.createHtmlField($field, config.fieldSize);


        jqMap.$fieldEl = $('.' + gomoku.view.returnClassFieldElement());
        // Создаем отслеживание события по клику
        gomoku.controller.bindClickField(jqMap.$fieldEl);
    }

    return {
        initModule: initModule,
        setMove: setMove
    }
})();