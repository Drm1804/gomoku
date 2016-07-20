'use strict';


/*
 * Модуль gomoku.controller, отвечает за обработку действий пользователя
 *
 * Предназначение:
 *   - todo перехват события активации игры
 *   - todo перехват события заполнения настроек игры
 *   - todo перехват действий пользователя во время игры
 *
 * */

gomoku.controller = (function () {

    /*
    * Публичный метод listenerClickField
    *
    * Активирует событие по клику и передает данные в модель
    *
    * */
    function listenerClickField(clickClass) {
        clickClass.click(function (ev) {
            var id = $(ev.target).attr('id');
            gomoku.model.setMove(id, 'x');
            return false;
        });

    }


    return {
        listenerClickField: listenerClickField
    }
})();