const page = document.body.dataset.page;

if (page === "index") {
  // === Gallery Page ===
  const gallery = document.querySelector('.gallery');

  // Map backend animal names to local image filenames
  const imageMap = {
    "Ein": "corgi.jpg",
    "Luna": "blackCat.jpg",
    "Chopper": "reindeer.jpg",
    "Gama": "redToad.jpg",
    "Hawk": "pig.jpg"
  };

  async function loadGallery() {
    try {
      const res = await fetch('/animals'); // Get animals from backend
      const animals = await res.json();

      gallery.innerHTML = '';
      animals.forEach(animal => {
        const imgSrc = imageMap[animal.name];

        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
          <a href="details.html">
            <div class="gallery-image">
              <img src="images/${imgSrc}" alt="${animal.description}">
              <div class="overlay">Get Details</div>
            </div>
          </a>
          <div class="gallery-caption">
            <div class="gallery-title">${animal.name}</div>
            <div class="gallery-subtitle">${animal.title}</div>
          </div>
        `;
        gallery.appendChild(item);
      });
    } catch (err) {
      console.error('Error loading gallery:', err);
      gallery.innerHTML = '<p>Failed to load animals.</p>';
    }
  }

  window.addEventListener('load', loadGallery);
}

if (page === "details") {
  // === Deck Page ===
  const deck = document.querySelector('.deck');
  const prevBtn = document.querySelector('.arrow.prev');
  const nextBtn = document.querySelector('.arrow.next');
  let cards = [];
  let currentIndex = 0;

  const imageMap = {
    "Ein": "corgi.jpg",
    "Luna": "blackCat.jpg",
    "Chopper": "reindeer.jpg",
    "Gama": "redToad.jpg",
    "Hawk": "pig.jpg"
  };

  async function loadDeck() {
    try {
      const res = await fetch('/animals');
      const animals = await res.json();

      deck.innerHTML = '';
      animals.forEach(animal => {
        const imgSrc = imageMap[animal.name];

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="images/${imgSrc}" alt="${animal.name}">
          <h3>${animal.name}</h3>
          <p>${animal.title}</p>
          <p>${animal.description}</p>
        `;
        deck.appendChild(card);
      });

      cards = Array.from(deck.children);
      currentIndex = Math.floor(cards.length / 2);
      updateDeck();
    } catch (err) {
      console.error('Error loading deck:', err);
    }
  }

  function updateDeck() {
    if (!cards.length) return;
    cards.forEach(c => c.classList.remove('active'));
    cards[currentIndex].classList.add('active');

    const viewport = document.querySelector('.deck-viewport');
    const viewportWidth = viewport.offsetWidth;

    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
      offset += cards[i].offsetWidth + 20;
    }

    const activeCard = cards[currentIndex];
    const activeCardWidth = activeCard.offsetWidth;

    let scrollAmount = offset + activeCardWidth / 2 - viewportWidth / 2;
    scrollAmount = Math.max(0, scrollAmount);

    deck.style.transform = `translateX(-${scrollAmount}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateDeck();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateDeck();
  });

  window.addEventListener('load', loadDeck);
  window.addEventListener('resize', updateDeck);
}

if (page === "form") {
  // === Form Page ===
  const form = document.querySelector('#upload-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const animalData = {
      name: formData.get('name'),
      title: formData.get('title'),
      description: formData.get('description')
    };

    try {
      // Post to backend
      const res = await fetch('/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData)
      });

      if (!res.ok) throw new Error('Failed to submit animal');

      alert('Animal added successfully!');
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Error submitting animal');
    }
  });
}
