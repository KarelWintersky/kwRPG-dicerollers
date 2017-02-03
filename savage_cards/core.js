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

function paintCards(cards, target) {

}

function paintAloneCard(card, target) {
    $$(target).innerHTML = card.display;
    $$(target)['style']['color'] = card.color;
}



function init() {
    /*if (window.location.protocol === 'file:') {
        $$('note').style.display = 'none';
    }*/

    window.deck = fillCardsArray();
    $$('target-deck-size').innerHTML = window.deck.length;


    // куки
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
        var card = drawCards(window.deck, 1)[0];
        var message = '<p style="color: ' + card.color +
            '" class="card-in-card-set">' + card.display + '</p>';
        $$('target-cards-set').innerHTML += message;

        $$('target-deck-size').innerHTML = window.deck.length;

        if (window.deck.length == 0) {
            $$('action-draw-alone-card').disabled = true;
        }
    });

    addOnClickEvent('action-draw-cards-for-set', function(){
        var selector = $$('select-set-size');
        var count = selector.options[selector.selectedIndex].value;
        var cards = drawCards(window.deck, count);
        var message = '';
        var complete_message = '';

        for (var index in cards) {
            var card = cards[index];
            message = '<p style="color: ' + card.color +
                '" class="card-in-card-set">' + card.display + '</p>';
            complete_message += message;
        }

        $$('target-cards-set').innerHTML += complete_message;
        $$('target-deck-size').innerHTML = window.deck.length;

        if (window.deck.length == 0) {
            $$('action-draw-alone-card').disabled = true;
        }
    });
}

var deck = [];