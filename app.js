// app.js
const SHEETS = {
    set1: 'set1', // Update to match the JSON file names
    set2: 'set2',
    set3: 'set3'
};

let remainingCards = [];

const ICONS = {
    'Drink': '🍻 Drink!',
    'Keep Card': '🃏 Keep!',
    'Technical': '🔧 Special!',
    'Minigame': '🎲 Minigame!',
    'Do': '😎 Do it!',
    'Truth or Drink': '🤭 Truth or Drink!',
    'Dare or Drink': '😵 Dare or Drink!',
    'Unknown': '❓'
};
/*
async function fetchCards(sheetName) {
    try {
        const response = await fetch(`/api/cards/${sheetName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        alert('Error fetching card data. Check the console for details.');
        return [];
    }
}
*/

async function fetchCards(setName) {
    try {
        const response = await fetch(`data/${setName}.json`); // Correct path to JSON files
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        alert('Error fetching card data. Check the console for details.');
        return [];
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function displayNextCard() {
    const cardTitleElement = document.getElementById('card-title');
    const cardContentElement = document.getElementById('card-content');
    const cardIconElement = document.getElementById('card-icon');
    const cardFooterElement = document.getElementById('card-footer');

    if (remainingCards.length === 0) {
        cardTitleElement.textContent = "All cards viewed!";
        cardContentElement.textContent = "";
        cardIconElement.textContent = '';
        cardFooterElement.textContent = '';
        return;
    }

    const card = remainingCards.pop();
    cardTitleElement.textContent = card.title || "Untitled";
    cardContentElement.textContent = card.body || "No content available.";
    cardIconElement.textContent = ICONS[card.type] || ICONS['Unknown'];
    cardFooterElement.textContent = card.footer ? `or drink ${card.footer}` : "";
}

async function selectCardSet(setName) {
    // Clear the remainingCards array before fetching new cards
    remainingCards = [];

    remainingCards = await fetchCards(SHEETS[setName]);
    shuffle(remainingCards);
    displayNextCard();

    showSection('card-page');
}

function goBack() {
    showSection('landing-page');
}

function showSection(sectionId) {
    // Hide all sections
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('how-to-play-page').classList.add('hidden');
    document.getElementById('card-page').classList.add('hidden');

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
}

document.querySelector('#card-page .card-container').addEventListener('click', displayNextCard);
