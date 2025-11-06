let currentIndex = 2; // global for deck
let cards = [];
let deck;
let dropdown;

document.addEventListener('DOMContentLoaded', async () => {
    deck = document.getElementById('deck');
    dropdown = document.getElementById('details');

    // Fetch animals and populate dropdown & deck
    const animals = await fetchAnimals();
    populateDropdownAndDeck(animals);

    // Initialize cards array after deck is populated
    cards = Array.from(deck.children);

    // Set up deck navigation
    setupDeckNavigation();

    // Start at middle card
    currentIndex = Math.floor(cards.length / 2);
    updateDeck();

    // Handle dropdown change
    dropdown.addEventListener('change', (e) => {
        if (e.target.value !== "") {
            currentIndex = parseInt(e.target.value);
            updateDeck();
        }
    });

    // Keep center on resize
    window.addEventListener('resize', updateDeck);
});

async function fetchAnimals() {
    try {
        const res = await fetch('/animals');
        const animals = await res.json();
        return animals;
    } catch (err) {
        console.error('Error fetching animals:', err);
        return [];
    }
}

function populateDropdownAndDeck(animals) {
    const imageMap = {
        "Ein": "images/corgi.jpg",
        "Luna": "images/blackCat.jpg",
        "Chopper": "images/reindeer.jpg",
        "Gama": "images/redToad.jpg",
        "Hawk": "images/pig.jpg"
    };

    const altMap = {
        "Ein": "a corgi sitting in a field",
        "Luna": "a black cat walking",
        "Chopper": "a reindeer laughing",
        "Gama": "a red toad relaxing",
        "Hawk": "a pig eats out of a bowl"
    };

    deck.innerHTML = '';

    animals.forEach((animal, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${imageMap[animal.name]}" alt="${altMap[animal.name]}">
            <h3>${animal.name} - ${animal.title || ''}</h3>
            <p>${animal.description || animal.caption || ''}</p>
        `;
        deck.appendChild(card);

        // Add dropdown option
        const option = document.createElement('option');
        option.value = index;
        option.textContent = animal.name;
        dropdown.appendChild(option);
    });
}

function setupDeckNavigation() {
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateDeck();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateDeck();
    });
}

function updateDeck() {
    cards.forEach(card => card.classList.remove('active'));
    if (cards[currentIndex]) {
        cards[currentIndex].classList.add('active');

        const viewport = document.querySelector('.deck-viewport');
        const viewportWidth = viewport.offsetWidth;

        let offset = 0;
        for (let i = 0; i < currentIndex; i++) {
            offset += cards[i].offsetWidth + 20; // CSS gap
        }

        const activeCard = cards[currentIndex];
        const activeCardWidth = activeCard.offsetWidth;

        let scrollAmount = offset + activeCardWidth / 2 - viewportWidth / 2;
        scrollAmount = Math.max(0, scrollAmount);

        deck.style.transform = `translateX(-${scrollAmount}px)`;
    }
}
