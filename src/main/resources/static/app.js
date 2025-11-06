document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const dropdown = document.getElementById('details');

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

    fetch('/animals')
        .then(res => res.json())
        .then(animals => {
            gallery.innerHTML = '';
            animals.forEach(animal => {
                const figure = document.createElement('figure');
                figure.innerHTML = `
                    <a href="details.html?id=${animal.id}">
                        <div class="figure-content">
                            <img src="${imageMap[animal.name]}" alt="${altMap[animal.name]}" width="600" height="400">
                            <div class="overlay">Get Details</div>
                        </div>
                    </a>
                    <figcaption>
                        ${animal.name}<br>
                        ${animal.caption}
                    </figcaption>
                `;
                gallery.appendChild(figure);

                const option = document.createElement('option');
                option.value = `details.html?id=${animal.id}`;
                option.textContent = animal.name;
                dropdown.appendChild(option);
            });
        })
        .catch(err => console.error('Error fetching animals:', err));

    dropdown.addEventListener('change', (e) => {
        if (e.target.value) {
            window.location.href = e.target.value;
        }
    });
});
