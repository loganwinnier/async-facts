"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";
const $getCard = $("#get-card");

const DECK_ID = getDeck();
console.log('global', DECK_ID);


/** get a deck of cards */
async function getDeck() {

  const response = await fetch(`${BASE_URL}/new/shuffle`);
  const data = await response.json();

  const deckID = data.deck_id;

  console.log("deckid:", deckID);
  return deckID;

}


$getCard.on("click", drawCard);

/**draw a card from the deck we got */
async function drawCard() {

  const response = await fetch(`${BASE_URL}/${DECK_ID}/draw/?count=1`);
  const data = await response.json();

  console.log(data);



}
