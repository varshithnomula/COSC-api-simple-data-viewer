const gallery = document.getElementById('dog-gallery');
const refreshBtn = document.getElementById('refresh-btn');
const breedFilter = document.getElementById('breed-filter');

async function fetchBreeds() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  const breeds = Object.keys(data.message);
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed;
    option.textContent = breed[0].toUpperCase() + breed.slice(1);
    breedFilter.appendChild(option);
  });
}

async function fetchDogs(breed = '', count = 5) {
  gallery.innerHTML = 'Loading...';
  let url = breed 
    ? `https://dog.ceo/api/breed/${breed}/images/random/${count}`
    : `https://dog.ceo/api/breeds/image/random/${count}`;
  const res = await fetch(url);
  const data = await res.json();
  renderDogs(data.message);
}

function renderDogs(images) {
  gallery.innerHTML = '';
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
}

refreshBtn.addEventListener('click', () => {
  const breed = breedFilter.value;
  fetchDogs(breed);
});

breedFilter.addEventListener('change', () => {
  const breed = breedFilter.value;
  fetchDogs(breed);
});

// Init
fetchBreeds();
fetchDogs();
