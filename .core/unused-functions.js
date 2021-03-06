/**
 * Кидает 1dN
 * @param N
 * @returns {number}
 */
function diceroll(N) {
    return Math.floor( Math.random() * N + 1);
}

/**
 * Отладочная функция: выводит в консоль информацию о среде запуска скрипта
 */
function where() {
    if (typeof(process) != 'undefined') {
        console.log(process.release.name + ' ' + process.versions.node);
    };
    if (typeof(navigator) != 'undefined') {
        console.log(navigator.userAgent);
    }
}

/**
 * Получить N-ый элемент хэша.
 * @param arr
 * @param n
 * @returns {*}
 * НЕ ИСПОЛЬЗУЕТСЯ
 */
function getNthArrayElement(arr, n)
{
    for (var i in arr) {
        if (!arr.hasOwnProperty(i)) continue
        else return arr[i];
    }
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function padZeroes(num) {
    return ("000" + num).substr(-3, 3);
}


// var full_deck = fillCardsArray();
// console.log( full_deck.length, full_deck );

// var new_deck = drawCards(full_deck, 100);
// console.log( 'new_deck.length ', new_deck.length );
// console.log( 'full_deck.length: ', full_deck.length, full_deck );

/*
 var deck = drawCards(full_deck, 3);
 console.log( deck );

 console.log( drawAloneCard( deck ) );
 console.log( drawAloneCard( deck ) );
 console.log( drawAloneCard( deck ) );
 */

