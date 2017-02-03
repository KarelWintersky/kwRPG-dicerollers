/*
 ♥♡ - H - Hearts
 ♦♢ - D - Diamonds
 ♣♧ - C - Clubs, Clovers
 ♠♤ - S - Spades
 2-10
 Valet, Queen, King, Ace, Joker
 */
/**
 * Эта структура данных не используется, она нужна как "визуальный прототип"
 */
var card_template = {
    lead : '',      // ♥♦♣♠
    rank : '',      // 2-10, Ace, King, Queen, Jack, Joker
    display: '',    // строка вывода
    color: ''       // цвет
};

/**
 * Возвращает nodejs или browser в зависимости от того, где запущен скрипт.
 * Используется для установки данных в отладочных целях.
 * Отладку проводим в nodejs
 * @returns {*}
 */
function getEnvironment() {
    if (typeof(process) != 'undefined') {
        return 'nodejs';
    };
    if (typeof(navigator) != 'undefined') {
        return 'brower';
    }
}

/**
 * Возвращает массив с исходной упорядоченной колодой карт
 * @returns {Array}
 */
function fillCardsArray() {
    var debug_index = 1;
    var storage = [];
    var available_ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
    'J', 'Q', 'K', 'A'];
    var available_leads
        = (getEnvironment() == 'nodejs')
        ? ['H', 'D', 'C', 'S']
        : ['♥', '♦', '♣', '♠'];

    for (var lead in available_leads) {
        // set color
        var color
            = (lead < 2)
            ? '#FF0000'
            : '#000000';

        for (var rank in available_ranks) {
            var card = {};
            // card.id = debug_index++;
            card.lead = available_leads[lead];
            card.rank = available_ranks[rank];
            card.display = card.rank + card.lead;
            card.color = color;
            storage.push( card );
            card = null;
        }
    }
    // add two jokers
    card = {};
    // card.id = debug_index++;
    card.lead = '';
    card.rank = 'Joker';
    card.display = card.rank;
    card.color = '#FF0000';
    storage.push( card );

    card = {};
    // card.id = debug_index++;
    card.lead = '';
    card.rank = 'Joker';
    card.display = card.rank;
    card.color = '#000000';
    storage.push( card );

    card = null;

    return storage;
}


/**
 * Вытягивает из колоды несколько карт, помещает их во временную
 * колоду. Из старой колоды карты удаляются.
 * @param cards_array - исходная колода, изменяется!!!
 * @param N - количество карт
 * @returns {Array} - колода выбранных карт
 */
function drawCards(cards_array, N) {
    var miniDeck = [];

    for (i = 1; i <= N; i++) {
        if (cards_array.length == 0) break; // prevent redundant iterations
        var r = Math.floor( Math.random() * cards_array.length );
        var card = cards_array.splice( r, 1 );
        miniDeck = miniDeck.concat( card );
    }
    return miniDeck;
}

function drawAloneCard(cards_array) {
    var r = Math.floor( Math.random() * cards_array.length );
    return cards_array[r];
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


