/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(item => {
        let newDiv = document.createElement("div")
        newDiv.classList.add("game-card")
        newDiv.innerHTML = `
        <div>
            <div>
                <img class="game-img" src="${item.img}">
            </div>
            <h3>${item.name}</h3>
            
            <p>${item.description}</p>
        </div>
        `;
        gamesContainer.appendChild(newDiv)
    })


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContribution = GAMES_JSON.reduce( (acc, contribution) => {
    return acc + contribution.backers
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `
        <div>
      
            <p>${totalContribution.toLocaleString('en-US')}</p>
        </div>
        `;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce( (acc, amount) => {
    return acc + amount.pledged
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
        <div>
      
            <p>$${totalAmount.toLocaleString('en-US')}</p>
        </div>
        `;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `
        <div>
      
            <p>${GAMES_JSON.length.toLocaleString('en-US')}</p>
        </div>
        `;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnreached = GAMES_JSON.filter ( (game) => {
        return game.goal > game.pledged;
    });
    console.log(listOfUnreached);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnreached);

}
// filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfReached = GAMES_JSON.filter ( (game) => {
        return game.goal <= game.pledged;
    });
    console.log(listOfReached);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfReached);

}
// filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnfundedGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + (game.pledged < game.goal ? 1 : 0);
}, 0); 

// console.log(totalUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr1 = `A total of $${totalAmount.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, 1 game
remains unfunded. We need your help to fund these amazing games!`

const displayStr2 = `A total of $${totalAmount.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${totalUnfundedGames} games
remain unfunded. We need your help to fund these amazing games!`

let textToDisplay = totalUnfundedGames > 1 ? displayStr2 : displayStr1;




// create a new DOM element containing the template string and append it to the description container
let newDOM = document.createElement("div")
        newDOM.innerHTML = `
        <div>
            
            <p>${textToDisplay}</p>
        </div>
        `;
        descriptionContainer.appendChild(newDOM)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let[mostFunded, secondMostFunded, ...others] = sortedGames;
console.log(mostFunded, secondMostFunded);

// create a new element to hold the name of the top pledge game, then append it to the correct element
let topGame = document.createElement("p")
    topGame.innerHTML = mostFunded.name;
    firstGameContainer.appendChild(topGame);

// do the same for the runner up item
let secondGame = document.createElement("p")
    secondGame.innerHTML = secondMostFunded.name;
    secondGameContainer.appendChild(secondGame);