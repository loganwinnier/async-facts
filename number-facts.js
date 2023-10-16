'use strict'

const BASE_NUM_API_URL = 'http://numbersapi.com/';

/** showNumberTrivia: Takes a number and logs a fact about the number  */
async function showNumberTrivia(number) {

    const response = await fetch(`${BASE_NUM_API_URL}${number}?json`);
    const data = await response.json();

    console.log(data.text);
}

// showNumberTrivia(12)

/** takes an array of 4 numbers and logs the first response from numbers API */
async function showNumberRace(numbers) {
    const firstResponse = fetch(`${BASE_NUM_API_URL}${numbers[0]}?json`);
    const secondResponse = fetch(`${BASE_NUM_API_URL}${numbers[1]}?json`);
    const thirdResponse = fetch(`${BASE_NUM_API_URL}${numbers[2]}?json`);
    const fourthResponse = fetch(`${BASE_NUM_API_URL}${numbers[3]}?json`);

    const winnerPromise = Promise.race(
        [firstResponse,
            secondResponse,
            thirdResponse,
            fourthResponse]);

    const winnerJSON = await winnerPromise;
    const winner = await winnerJSON.json();
    console.log(winner.text);
}

showNumberRace([5, 6, 7, 8])