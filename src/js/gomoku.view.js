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
    that.toggleGameField = toggleGameField;
    that.toggleStartWindow = toggleStartWindow;
    that.toggleFinalWindow = toggleFinalWindow;
    that.togglePauseWindow = togglePauseWindow;
    that.createHtmlGameField = createHtmlGameField;
    that.createHtmlPauseWindow = createHtmlPauseWindow;
    that.createHtmlStartWindow = createHtmlStartWindow;
    that.createHtmlFinalWindow = createHtmlFinalWindow;
    that.run = run;
    that.run();


    /*
     * Метод run исполняется сразу
     */

    function run() {
        that.jqMap.rootObject = rootObject;
        that.createHtmlStartWindow();
        that.createHtmlPauseWindow();

    }

    function createHtmlFinalWindow(){
        var html = '' +
            '<div class="g-final" id="g-final">' +
            '<div class="g-final-box"><span class="g-final-box-text">Конец</span></div>' +
            '</div>';

        that.jqMap.rootObject.append(html);
        that.jqMap.finalForm = that.jqMap.rootObject.find('#g-final');
    }

    function toggleFinalWindow(){
        if (that.jqMap.finalForm.is(":visible")) {
            that.jqMap.finalForm.hide();
        } else {
            that.jqMap.finalForm.show();
        }
    }

    function createHtmlPauseWindow() {
        var html = '' +
            '<div class="g-pause" id="g-pause">' +
            '<div class="g-pause-box"><span class="g-pause-box-text">Пауза</span></div>' +
            '</div>';

        that.jqMap.rootObject.append(html);
        that.jqMap.pauseForm = that.jqMap.rootObject.find('#g-pause');
    }

    function togglePauseWindow() {
        if (that.jqMap.pauseForm.is(":visible")) {
            that.jqMap.pauseForm.hide();
        } else {
            that.jqMap.pauseForm.show();
        }
    }

    function createHtmlStartWindow() {
        var html = '' +
            '<form id="g-start" class="g-start" name="startForm" method="">' +
            '<div class="g-start-box">' +
            '<h2>Новая игра</h2>' +
            '<label for="g-start-size-input">Величина игрового поля</label>' +
            '<input type="number" value="20" id="g-start-size-input" class="g-start-size-input">' +
            '<h3>Противник:</h3>' +
            '<input style="display:none" class="g-start-radio-input g-start-radio-input--opponent" type="radio" value="man" name="opponent" id="g-start-opponent-man" checked>' +
            '<label class="g-start-op-label g-start-op-man-label" for="g-start-opponent-man"></label>' +
            '<input style="display:none" class="g-start-radio-input g-start-radio-input--opponent" type="radio" value="pc" name="opponent" id="g-start-opponent-pc" >' +
            '<label class="g-start-op-label g-start-op-pc-label" for="g-start-opponent-pc"></label>' +
            '<div class="g-start-type-box">' +
            '<h3>Играть за:</h3>' +
            '<input style="display:none" type="radio" class="g-start-radio-input g-start-radio-input--type" id="g-start-type-x" value="x" name="typeFigure" checked>' +
            '<label class="g-start-type-x" for="g-start-type-x">X</label>' +
            '<input style="display:none" type="radio" class="g-start-radio-input g-start-radio-input--type" id="g-start-type-o" value="o" name="typeFigure">' +
            '<label class="g-start-type-o" for="g-start-type-o">O</label>' +
            '</div>' +
            '<button class="g-start-run-game">Начать игру</button>' +
            '</div>' +
            '</form>';

        that.jqMap.rootObject.append(html);
        that.jqMap.startForm = that.jqMap.rootObject.find('#g-start');
        that.jqMap.startTypeBox = that.jqMap.rootObject.find('.g-start-type-box');
        that.jqMap.startCheckOpponent = that.jqMap.rootObject.find('.g-start-op-label');
        that.jqMap.btnRunGame = that.jqMap.rootObject.find('.g-start-run-game');


        // Вешаем наблюдателя, который будет скрывать и показывать выбор команды (крестики или нолики)
        model.modelChangedSubject.addObserver(showGameTypeBox);

        // Вешаем наблюдателя на кнопку "Начать игру"
        model.modelChangedSubject.addObserver(startGame);
    }

    function toggleStartWindow() {
        if (that.jqMap.startForm.is(":visible")) {
            that.jqMap.startForm.hide();
        } else {
            that.jqMap.startForm.show();
        }
    }

    function createHtmlGameField(size) {
        var tomMenu = '<div id="g-menu" class="g-menu">' +
            '<div class="g-menu-item g-menu-item--active">' +
            '<span class="g-menu-i-name">Игрок 1</span>' +
            '(Х)' +
            '</div>' +
            '<div class="g-menu-item">' +
            '<span class="g-menu-i-name">Игрок 2</span>' +
            '(О)' +
            '</div></div>';
        var html = tomMenu + '<table id="g-field" class="g-field">';

        for (var row = 0; row < size; row++) {
            html += '<tr>';
            for (var col = 0; col < size; col++) {
                html += '<td id="el' + (size * row + col) + '" class="g-click-field"></td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        that.jqMap.rootObject.append(html);
        that.jqMap.gameField = that.jqMap.rootObject.find('#g-field');
        that.jqMap.gameFieldEl = that.jqMap.rootObject.find('.g-click-field');
        that.jqMap.menu = that.jqMap.rootObject.find('#g-menu');
        that.jqMap.menuItem = that.jqMap.menu.find('.g-menu-item');
        that.jqMap.menuItemName = that.jqMap.menu.find('.g-menu-i-name');
    }

    function toggleGameField() {
        if (that.jqMap.gameField.is(":visible")) {
            that.jqMap.gameField.hide();
        } else {
            that.jqMap.gameField.show();
        }
    }



    /*************************/
    // Функции для наблюдателей
    /*************************/

    function showGameTypeBox(ev) {
        if (ev.type === 'click' && $(ev.target).attr('class').indexOf('g-start-op-label') != -1) {
            var clickDomClass = $(ev.target).attr('for');
            var hideElement = that.jqMap.startTypeBox;

            if (clickDomClass === 'g-start-opponent-pc') {
                hideElement.show();
            } else {
                hideElement.hide();
            }
        }
    }

    function gamePause(ev) {
        if (ev.type === 'keydown') {
            if (ev.keyCode == 27 || ev.keyCode == 19) {
                that.togglePauseWindow();

            }
        }
    }

    function gameMove(ev){
        if(ev.type === 'gameLoop'){
            that.jqMap.gameField.find('#el'+ev.numFieldEl).text(ev.typeMove)
        }
    }

    function gameFinal(ev){
        if(ev.type === 'gameWin'){
            toggleFinalWindow();
        }
    }

    function changeMenuType(ev){
        if(ev.type === 'changeType'){
            that.jqMap.menuItem.removeClass('g-menu-item--active');
            switch(ev.newType){
                case('x'):
                    that.jqMap.menuItem.eq(0).addClass('g-menu-item--active');
                    break;
                case('o'):
                    that.jqMap.menuItem.eq(1).addClass('g-menu-item--active');
                    break;
            }
        }
    }

    function startGame(ev) {

        if (ev.type === 'click' && $(ev.target).attr('class').indexOf('g-start-run-game') != -1) {
            var form = $('[name="startForm"]');
            var data = {
                size: form.find('#g-start-size-input').val(),
                opponent: form.find('.g-start-radio-input--opponent:checked').val(),
                type: form.find('.g-start-radio-input--type:checked').val()
            };
            model.setGameData(data);

            // Удаляем наблюдателей стартовой формы
            model.modelChangedSubject.removeObserver(showGameTypeBox);
            model.modelChangedSubject.removeObserver(startGame);

            // Вешаем наблюдателя игровой паузы
            model.modelChangedSubject.addObserver(gamePause);

            // Вешаем наблюдателя игровых ходов
            model.modelChangedSubject.addObserver(gameMove);

            // Вешаем наблюдателя смены типа хода
            model.modelChangedSubject.addObserver(changeMenuType);

            // Вешаем наблюдателя конца игры
            model.modelChangedSubject.addObserver(gameFinal);
        }
    }


};