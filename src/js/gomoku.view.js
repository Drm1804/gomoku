'use strict';

/*
 * gomoku.view
 *
 * Вид. Знает только о модели. Строит внешнай вид.
 *
 * */

G.View = function (_model, rootObject) {

    var that = this;
    var model = _model;
    that.jqMap = {};
    that.createHtmlField = createHtmlField;
    that.createHtmlPauseWindow = createHtmlPauseWindow;
    that.createHtmlStartWindow = createHtmlStartWindow;
    that.run = run;
    that.run();


    /*
     * Метод run исполняется сразу
     */

    function run(){
        that.jqMap.rootObject = rootObject;
        that.createHtmlStartWindow();
    }


    function createHtmlPauseWindow() {
        var html = '' +
            '<div class="g-pause">' +
            '<div class="g-pause-box"><span class="g-pause-box-text">Пауза</span></div>' +
            '</div>';

        rootObject.append(html);

    }

    function createHtmlStartWindow() {
        var html = '' +
            '<div class="g-start">' +
            '<div class="g-start-box">' +
            '<h2>Новая игра</h2>' +
            '<label for="g-start-size-input">Величина игрового поля</label>' +
            '<input type="number" value="20" id="g-start-size-input" class="g-start-size-input">' +
            '<h3>Противник:</h3>' +
            '<input style="display:none" class="g-start-radio-input g-start-radio-input--opponent" type="radio" value="man" name="opponent" id="g-start-opponent-man">' +
            '<label class="g-start-op-label g-start-op-man-label" for="g-start-opponent-man"></label>' +
            '<input style="display:none" class="g-start-radio-input g-start-radio-input--opponent" type="radio" value="pc" name="opponent" id="g-start-opponent-pc">' +
            '<label class="g-start-op-label g-start-op-pc-label" for="g-start-opponent-pc"></label>' +
            '<div class="g-start-type-box">' +
            '<h3>Играть за:</h3>' +
            '<input style="display:none" type="radio" class="g-start-radio-input g-start-radio-input--type" id="g-start-type-x" name="typeFigure">' +
            '<label class="g-start-type-x" for="g-start-type-x">X</label>' +
            '<input style="display:none" type="radio" class="g-start-radio-input g-start-radio-input--type" id="g-start-type-o" name="typeFigure">' +
            '<label class="g-start-type-o" for="g-start-type-o">O</label>' +
            '</div>' +
            '<button class="g-start-run-game">Начать игру</button>' +
            '</div>' +
            '</div>';

        that.jqMap.rootObject.append(html);
        that.jqMap.startTypeBox = rootObject.find('.g-start-type-box');
        that.jqMap.startCheckOpponent = rootObject.find('.g-start-op-label');
        that.jqMap.btnRunGame = rootObject.find('.g-start-run-game');


        // Вешаем наблюдателя, который будет скрывать и показывать выбор команды (крестики или нолики)
        model.modelChangedSubject.addObserver(function(ev){
            if($(ev.target).attr('class').indexOf('g-start-op-label') != -1){
                showGameTypeBox(ev);
            }
        });

        // Вешаем наблюдателя на кнопку "Начать игру"
        model.modelChangedSubject.addObserver(function(ev){


            if($(ev.target).attr('class').indexOf('g-start-run-game') != -1){
                startGame(ev);
            }


        });
    }

    function createHtmlField(size) {
        var html = '<table class="field">';

        for (var row = 0; row < size; row++) {
            html += '<tr>';
            for (var col = 0; col < size; col++) {
                html += '<td id="el' + (size * row + col) + '" class="'+config.classFieldElement+'"></td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        rootObject.append(html);
    }


    /*************************/
    // Функции для наблшюдателей
    /*************************/

    function showGameTypeBox(ev){
        var clickDomClass = $(ev.target).attr('for');
        var hideElement = that.jqMap.startTypeBox;

        if(clickDomClass === 'g-start-opponent-pc'){
            hideElement.show();
        } else {
            hideElement.hide();
        }
    }

    function startGame(ev){

        // todo Сохранить данные из формы в переменную
        // todo Сделать кнопку "Начать игру неактивной, пока данные не заполнены"
        // todo Есдли все успещно удалить наблюдателя за наблдателями стартовой формы
        // todo Запустить игру с выбранными параметрами
        console.log( $(ev.target));
        console.log( that.jqMap.btnRunGame);
    }



};