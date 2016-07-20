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

    var classFieldElement = 'click';

    function showMove(id, type){
        $('#'+id).text(type);


    }

    function returnClassFieldElement(){
        return classFieldElement;
    }


    function createHtmlField($field, size) {
        var html = '<table class="field">';

        for (var row = 0; row < size; row++) {
            html += '<tr>';
            for (var col = 0; col < size; col++) {
                html += '<td id="el' + (size * row + col) + '" class="'+classFieldElement+'"></td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        $($field).html(html);
    }

    function initModule($field, fieldSize) {
    }

    return {
        initModule: initModule,
        createHtmlField : createHtmlField ,
        showMove: showMove,
        returnClassFieldElement: returnClassFieldElement
    }
})();