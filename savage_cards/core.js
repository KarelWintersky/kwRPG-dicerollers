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

    // Вытянуть одну карту без изъятия из колоды
    addOnClickEvent('action-draw-alone-card', function(){
        var card = drawAloneCard(window.deck);
        paintAloneCard(card, 'target-alone-card');
    });

    // Перемешать колоду (переинициализировать)
    addOnClickEvent('action-shuffle-deck', function(){
        window.deck = fillCardsArray();
        $$('target-cards-set').innerHTML = '';

        $$('target-deck-size').innerHTML = window.deck.length;
    });

    // Вытягиваем одну карту из колоды и "выводим на стол"
    addOnClickEvent('action-draw-next-card-for-set', function(){
        var card = drawCards(window.deck, 1)[0];
        var message = '<span style="color: ' + card.color +
            '" class="card-in-card-set">' + card.display + '</span>&nbsp;&nbsp;';
        $$('target-cards-set').innerHTML += message;

        $$('target-deck-size').innerHTML = window.deck.length;
    });


}

var deck = [];