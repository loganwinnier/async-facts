"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";
const $getCard = $("#get-card");
const $deck = $("#deck")
let DECK_ID; // camel case and lower


/** get a deck of cards */
async function getDeck() {

    const response = await fetch(`${BASE_URL}/new/shuffle`);
    const data = await response.json();

    const deckID = data.deck_id;

    DECK_ID = deckID;
}

$getCard.on("click", drawCard);

/**draw a card from the deck we got */
async function drawCard() {

    const response = await fetch(`${BASE_URL}/${DECK_ID}/draw/?count=1`);
    const card = await response.json();
    if (card.remaining === 0) {
        $getCard.hide()
    } else {
        $deck.append(
            `<div class='card'>
                <img src='${card.cards[0]["image"]}'
            </div>`)
    }
}

getDeck()
