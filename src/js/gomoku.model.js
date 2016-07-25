'use strict';

/*
 * gomoku.model
 *
 * Модель ни о ком ничего не знает, только рассылает оповещения, без понимания, кто её слушает
 *
 * */

G.Model = function () {

    var gameData = {};

    var modelChangedSubject = G.makeObservableSubject();

    function refresh(ev, data){
        modelChangedSubject.notifyObservers(ev, data);
    }

    function setGameData(data){
        gameData = data;
        if(data.opponent === 'man'){
            delete  gameData.type;
        }
    }

    function getGameData(){
        return gameData
    }

    function startGame(){

        return true;
    }

     return{
         modelChangedSubject: modelChangedSubject,
         getGameData: getGameData,
         setGameData: setGameData,
         startGame: startGame,
         refresh: refresh
     }
};