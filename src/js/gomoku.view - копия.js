'use strict';

/*
 * Модуль gomoku.view, отвечает за отображение информации
 *
 * Предназначение:
 *   - todo отображение приветсвенного окна
 *   - todo построение и отображение игрового поля
 *   - todo показ результатов ингы
 *
 * */

gomoku.view = (function () {

    var config = {
        start_window_template: '',
        end_window_template: '',
        classFieldElement : 'g-click-field',
        classStartModalElement : 'g-start',
        classPauseModalElement : 'g-pause'
    };

    var state = {

    }


    function showMove(id, type){
        $('#'+id).text(type);


    }

    function returnClassFieldElement(){
        return config.classFieldElement;
    }


    function createHtmlField($field, size) {
        var html = '<table class="field">';

        for (var row = 0; row < size; row++) {
            html += '<tr>';
            for (var col = 0; col < size; col++) {
                html += '<td id="el' + (size * row + col) + '" class="'+config.classFieldElement+'"></td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        $($field).append(html);
    }

    function createHtmlPauseWindow($field){
        var html = '<div class="'+ config.classPauseModalElement +'">' +
            '<div class="g-pause-box"><span class="g-pause-box-text">Пауза</span></div>' +
            '</div>';

        $field.append(html);

    }

    function createHtmlStartWindow($field){
        var html = '<div class="'+ config.classStartModalElement +'">' +
            '<div class="g-start-box">' +
            '<h2>Новая игра</h2>' +
            '<label for="g-start-size-input">Величина игрового поля</label>' +
            '<input type="number" value="20" id="g-start-size-input" class="g-start-size-input">' +
            '<h3>Противник:</h3>' +
            '<input style="display: none" class="g-start-radio-input" type="radio" value="man" name="opponent" id="g-start-opponent-man">' +
            '<label class="g-start-op-man-label" for="g-start-opponent-man"></label>' +
            '<input style="display: none" class="g-start-radio-input" type="radio" value="pc" name="opponent" id="g-start-opponent-pc">' +
            '<label class="g-start-op-pc-label" for="g-start-opponent-pc"></label>' +
            '<h3>Играть за:</h3>' +
            '<input style="display: none" type="radio" class="g-start-radio-input" id="g-start-type-x" name="typeFigure">' +
            '<label class="g-start-type-x" for="g-start-type-x">X</label>' +
            '<input style="display: none" type="radio" class="g-start-radio-input" id="g-start-type-o" name="typeFigure">' +
            '<label class="g-start-type-o" for="g-start-type-o">O</label>' +
            '<button class="g-start-run-game">Начать игру</button>' +
            '</div>' +
            '</div>';

        $field.append(html);

        // Навешиваем ивенты на окно
    }

    function initModule($field, fieldSize) {
        // todo Создает окно завершения игры
    }

    return {
        initModule: initModule,
        createHtmlField : createHtmlField ,
        createHtmlPauseWindow : createHtmlPauseWindow ,
        createHtmlStartWindow : createHtmlStartWindow ,
        showMove: showMove,
        returnClassFieldElement: returnClassFieldElement
    }
})();