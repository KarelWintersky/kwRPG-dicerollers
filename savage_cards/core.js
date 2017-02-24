function $$(id) {
    if (typeof id == 'string') {
        return document.getElementById(id);
    }
    return id;
}

function addOnClickEvent(id, func) {
    var el = $$(id);
    el[window.addEventListener ? 'addEventListener' : 'attachEvent']( window.addEventListener ? 'click' : 'onclick', func, false);
}

/**
 * Рисует последовательность карт, добавляя её к контейнеру target
 * @param cards
 * @param target
 */
function paintCards(cards, target) {
    var message = '';
    var complete_message = '';

    for (var index in cards) {
        var card = cards[index];
        message = '<p style="color: ' + card.color +
            '" class="card-in-card-set">' + card.display + '</p>';
        complete_message += message;
    }

    $$(target).innerHTML += complete_message;
}

/**
 * Рисует одинокую карту
 * @param card
 * @param target
 */
function paintAloneCard(card, target) {
    // $$(target).innerHTML = card.display;
    // $$(target)['style']['color'] = card.color;
    var message = '<p style="color: ' + card.color +
        '" class="card-in-card-set">' + card.display + '</p>';
    $$(target).innerHTML = message;
}

/**
 * Основная функция - инициализация, где повешены все обработчики
 */
function init() {
    /*if (window.location.protocol === 'file:') {
        $$('note').style.display = 'none';
    }*/

    window.deck = fillCardsArray();
    $$('target-deck-size').innerHTML = window.deck.length;

    // Хуки
    // Перемешать колоду (переинициализировать)
    addOnClickEvent('action-shuffle-deck', function(){
        window.deck = fillCardsArray();
        $$('target-cards-set').innerHTML = '';

        $$('target-deck-size').innerHTML = window.deck.length;
        $$('action-draw-alone-card').disabled = false;
    });

    // Вытянуть одну карту без изъятия из колоды
    addOnClickEvent('action-draw-alone-card', function(){
        var card = drawAloneCard(window.deck);
        paintAloneCard(card, 'target-alone-card');
    });

    // Вытягиваем одну карту из колоды и "выводим на стол"
    addOnClickEvent('action-draw-next-card-for-set', function(){
        var cards = drawCards(window.deck, 1);
        if (cards.length === 0) return;

        paintCards(cards, 'target-cards-set');

        $$('target-deck-size').innerHTML = window.deck.length;

        if (window.deck.length == 0) {
            $$('action-draw-alone-card').disabled = true;
        }
    });

    addOnClickEvent('action-draw-cards-for-set', function(){
        var selector = $$('select-set-size');
        var count = selector.options[selector.selectedIndex].value;

        var cards = drawCards(window.deck, count);
        if (cards.length === 0) return;

        paintCards(cards, 'target-cards-set');

        $$('target-deck-size').innerHTML = window.deck.length;

        if (window.deck.length == 0) {
            $$('action-draw-alone-card').disabled = true;
        }
    });
}

var deck = [];