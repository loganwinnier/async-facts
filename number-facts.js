'use strict';

const BASE_NUM_API_URL = 'http://numbersapi.com/';

/** showNumberTrivia: Takes a number and logs a fact about the number  */
async function showNumberTrivia(number) {

    const response = await fetch(`${BASE_NUM_API_URL}${number}?json`);
    const data = await response.json();

    console.log("number trivia:", data.text);
}

// showNumberTrivia(12)

/** takes an array of 4 numbers and logs the first response from numbers API */
async function showNumberRace(numbers) {
    const promises = numbers.map(num => fetch(`${BASE_NUM_API_URL}${num}?json`))

    const winnerResponse = await Promise.race(promises);

    const winner = await winnerResponse.json();
    console.log("number race result:", winner.text);
}

//showNumberRace([5, 6, 7, 8]);

/**takes an array a few numbers and log promises or error messages */
async function showNumberAll(numbers) {
    const promises = numbers.map(num => fetch(`${BASE_NUM_API_URL}${num}?json`))


    const settledResponses = await Promise.allSettled(promises);

    const successResult = [];
    const failResult = [];

    for (let item of settledResponses) {
        if (item.status === "fulfilled" && item.value.ok === true) {
            const result = await item.value.json();
            successResult.push(result.text);

        } else if (item.status === "fulfilled" && item.value.ok === false) {
            failResult.push(item.value.statusText);
        }

    }
    console.log('Sucessful cases:', successResult, 'Failed cases', failResult);
}
//showNumberAll(['wrong', 3, 4]);

/** main: calls showNumberTrivia, showNumberRace, showNumberAll, in order and
 * moves onto next function when previous completes */
async function main() {
    await showNumberTrivia(5);
    await showNumberRace([300, 101, 99, 102]);
    await showNumberAll(['wrong', 8, 10])
}

main()
