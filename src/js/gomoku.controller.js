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
    * Публичный метод bindClickField
    *
    * Активирует событие по клику и передает данные в модель
    *
    * */
    function bindClickField(clickClass) {
        clickClass.click(function (ev) {
            var id = $(ev.target).attr('id');
            gomoku.model.setMove(id, 'x');
            return false;
        });

    }

    function unbindClick(clickClass){
        clickClass.unbind('click');
    }


    return {
        bindClickField: bindClickField,
        unbindClick: unbindClick
    }
})();