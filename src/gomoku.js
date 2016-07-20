'use strict';

/*
* Главный модуль приложения.
*
* */

var gomoku = (function(){


    function initModule($field){
        gomoku.model.initModule($field);
    }


    return{
        initModule: initModule
    }
})();