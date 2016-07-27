'use strict';


/*
 * gomoku.controller.
 *
 * Контроллер. Знает о модели и виде. Вешает ивенты наобъекты вида, связывая модуль и вид.
 *
 * */

G.Controller = function (_model, _view) {

    var that = this;
    var model = _model;
    var view = _view;

    view.jqMap.startCheckOpponent.on('click', function(ev){
        model.refresh(ev);
    });

    view.jqMap.btnRunGame.on('click', function(ev){
        model.refresh(ev);

        // Запускаем игру
        var size = model.getGameData().size;
        var type = model.getGameData().type;
        view.toggleStartWindow();
        view.createHtmlGameField(size);
        view.createHtmlFinalWindow();
        runFieldObserver();

        // Если выбран режим игры с компьютером, и первый ход за компьютером, то имитируем событие
        var stepCount = model.getStepCount();
        if(stepCount == 0 && type == 'o'){
            model.move(ev);
        }
        return false;
    });

    // Событие нажатия клавиши на клавиатуре
    $('body').keydown(function(ev){
        model.refresh(ev);
    });


    function runFieldObserver(){
        // Событие клика по полю
        view.jqMap.gameFieldEl.on('click', function(ev){
            model.move(ev);
            model.refresh(ev);
        });
    }


};