'use strict';


/*
 * gomoku.controller.
 *
 * Контроллер. Знает о модели и виде. Вешает ивенты наобъекты вида, связывая модуль и вид.
 *
 *
 * */

G.Controller = function (_model, _view) {

    var that = this;
    var model = _model;
    var view = _view;

    view.jqMap.startCheckOpponent.on('click', function(ev){
        model.refresh(ev)
    });

    view.jqMap.btnRunGame.on('click', function(ev){
        model.refresh(ev);

        return false;
    });


    // Событие нажатия клавиши на клавиатуре
    view.jqMap.rootObject.keydown(function(ev){
        model.refresh(ev);
    })
};