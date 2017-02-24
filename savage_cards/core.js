function $$(id) {
    if (typeof id == 'string') {
        return document.getElementById(id);
    }
    return id;
}

/**
 * Вешает обработчик на элемент
 * @param id
 * @param func
 */
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
    var message = '<p style="color: ' + card.color +
        '" class="card-in-card-set">' + card.display + '</p>';
    $$(target).innerHTML = message;
}

/**
 * Устанавливает статус кнопок вытягивания карт.
 * Disabled если колода пуста, Enabled в остальных случаях
 * Вызывается как setDrawButtonsState(window.deck);
 * @param deck
 */
function setDrawButtonsState(deck) {
    if (deck.length === 0) {
        $$('action-draw-alone-card').disabled = true;
        $$('action-draw-cards-for-set').disabled = true;
        $$('action-draw-next-card-for-set').disabled = true;
    } else {
        $$('action-draw-alone-card').disabled = false;
        $$('action-draw-cards-for-set').disabled = false;
        $$('action-draw-next-card-for-set').disabled = false;
    }
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
        setDrawButtonsState(window.deck);
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

        setDrawButtonsState(window.deck);
    });

    addOnClickEvent('action-draw-cards-for-set', function(){
        var selector = $$('select-set-size');
        var count = selector.options[selector.selectedIndex].value;

        var cards = drawCards(window.deck, count);
        if (cards.length === 0) return;

        paintCards(cards, 'target-cards-set');

        $$('target-deck-size').innerHTML = window.deck.length;

        setDrawButtonsState(window.deck);
    });
}

var deck = [];