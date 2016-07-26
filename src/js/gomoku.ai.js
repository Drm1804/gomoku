'use strict';

G.Pattern = function(){
    this.prePattern = [ // Шаблоны построения фигур и их веса. "x" в дальнейшем заменяется на крестик (1) или нолик (2), 0 - свободная ячейка
        {w: 10000, p: ['xxxxx']}, // Пять в ряд. Победа
        {w: 1000, p: ['0xxxx0']}, // Открытая четверка. Один ход до победы, 100% победа (соперник не может закрыть одним ходом)
        {w: 500, p: ['xxxx0']}, // Полузакрытая четверка. Один ход до победы, но соперник может заблокировать
        {w: 400, p: ['x0xxx', 'xx0xx']}, // Четверка с брешью. Один ход до победы, но соперник может заблокировать
        {w: 100, p: ['00xxx000']}, // Открытая тройка (как 2 полузакрытых)
        {w: 80, p: ['00xxx00']}, // Открытая тройка (как 2 полузакрытых)
        {w: 75, p: ['0xxx00']}, // Открытая тройка (как 2 полузакрытых)
        {w: 50, p: ['0xxx0','xxx00']}, // Полузакрытая тройка
        {w: 25, p: ['x0xx0', 'xx0x0', 'x00xx']}, // Тройка с брешью
        {w: 10, p: ['000xx000']}, // Открытая двойка
        {w: 5, p: ['0xx0']} // Открытая двойка
    ];
};