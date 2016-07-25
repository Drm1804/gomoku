'use strict';

/*
 * gomoku.model
 *
 * Модель ни о ком ничего не знает, только рассылает оповещения, без понимания, кто её слушает
 *
 * */

G.Model = function () {
    var that = this;
    this.modelChangedSubject = G.makeObservableSubject();


    this.refresh = function(ev, data){
        that.modelChangedSubject.notifyObservers(ev, data);
    }


};