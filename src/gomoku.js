'use strict';

var G = {};

G.makeObservableSubject = function(){
    var observers = [];
    var addObserver = function(o){
        if(typeof o !== 'function'){
            throw new Error ('observer должен быть функцией');
        }

        for(var i = 0; i < observers.length; i++){
            var observer = observers[i];
            if(observer === o){
                throw new Error ('observer уже добавлен в список');
            }
        }

        observers.push(o);
    };

    var removeObserver = function(o){
        for(var i = 0; i < observers.length; i++){
            var observer = observers[i];
            if(observer === o){
                observers.splice(i, 1);
                return;
            }
        }

        throw new Error('Не могу найти observer в списке ');
    };

    var notifyObservers = function(data){

        // Make a copy of observer list in case the list
        // is mutated during the notifications.

        var observersSnapshot = observers.slice(0);

        for(var i = 0; i < observersSnapshot.length; i++){
            observersSnapshot[i](data)
        }

    };

    return{
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers
    }

};