//IMMANUEL JOY PERKASA / 71200544


// 4. Import dog env dari env.js
import { dog_env } from './env.js';

console.log(dog_env.API_KEY)
// Deklarasi
// 5. Deklarasi variable savedPetList dengan getItem dari localStorage
const savedPetList = localStorage.getItem('petList');
// 6. JSON parse savedPetList karena local storage menyimpan value string
const petList = JSON.parse(savedPetList || '[]');

// 7. Buat instance untuk suatu search param (untuk pagination)
const searchParams = new URLSearchParams(window.location.search);
// 8. Ambil nilai dari suatu search param key bernama "page", default nilai = 1. Untuk pengesetan dilakukan dibawah dipoin 18
const currentPage = parseInt(searchParams.get('page')) || 1;

// API Call
// 9. Buat suatu fungsi bernama getBreedsImage untuk melakukan pemanggilan API 
const getBreedsImage = async (sortBy = 'ascending') => {
  const response = await fetch(
    `${dog_env.endpoint}/v1/images/search?include_categories=true&include_breeds=true&has_breeds=true&order=${sortBy}&page=${currentPage}&limit=10`,
    {
      method: 'GET',
      headers: {
        'x-api-key': dog_env.API_KEY,
      },
    }
  );
  return response.json();
};

// 10. Buat fungsi fetchImage untuk melakukan pemanggilan fungsi getBreedsImage sesuai sortBy yang dikirim
const fetchImage = (sortBy) => {
  getBreedsImage(sortBy)
    .then((data) => {
      // 10a. panggil fungsi getBreedsImage berisi parameter sortBy dengan menggunakan promise then.
      // ketika resolve, maka set nilai ke localstorage dengan pasangan key: petList dan value: hasil nilai yang diresolve (jangan lupa valuenya di JSON.stringify)
      localStorage.setItem('petList', JSON.stringify(data));
      // 10b. panggil fungsi render component (seperti pertemuan sebelumnya) dengan parameter value
      renderComponent(data);
    })
    .catch((error) => {
      console.error('Error fetching pet data:', error);
    });
};

fetchImage('ascending');

// 11. Definisikan selector untuk dropdown menu, search form, dan search input element
const dropdownElement = document.querySelector('.dropdownMenu');
const formElement = document.querySelector('.searchForm');
const searchInputElement = document.querySelector('.searchInput');

// pagination
// 12. Definisikan selector untuk pagination
const prevPage = document.querySelector('.prevPagination');
const pageOne = document.querySelector('.pageOne');
const pageTwo = document.querySelector('.pageTwo');
const pageThree = document.querySelector('.pageThree');
const nextPage = document.querySelector('.nextPagination');

// 13. Buat fungsi bernama petCardComponent untuk me render nilai dari hasil fetch data di endpoint
const PetCardComponent = (pet) => {
  // 13a. tampilkan nilai dari breeds dari array ke 0
  // 13b. tampilkan hasil nilai dibawah ini sesuai dengan response yang didapatkan
  return `<div class="card my-3 mx-2" style="width: 20%">
    <img height="300" style="object-fit: cover" class="card-img-top" src=${pet.url} alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title d-inline">${pet.breeds[0].name}</h5>
      <p class="card-text">
        ${pet.breeds[0].temperament}
      </p>
      <p>${pet.breeds[0].bred_for}</p>
      <span class="badge badge-pill badge-info">${pet.breeds[0].breed_group}</span>
      <span class="badge badge-pill badge-warning">Weight: ${pet.breeds[0].weight.metric}</span>
      <span class="badge badge-pill badge-danger">Height: ${pet.breeds[0].height.metric}</span>
    </div>
  </div>`;
};

const renderComponent = (filteredPet) => {
  document.querySelector('.petInfo').innerHTML = filteredPet
    .map((pet) => PetCardComponent(pet))
    .join('');
};

// 14. buat fungsi sortPetById sesuai dengan key yang dipilih
const sortPetById = (key) => {
  // 14. Buat kondisi berdasarkan nilai key
  if (key === 'ascending') {
    const sortedData = [...petList];
    sortedData.sort((a, b) => (a.breeds?.[0]?.id > b.breeds?.[0]?.id ? 1 : -1));
    renderComponent(sortedData);
  } else if (key === 'descending') {
    const sortedData = [...petList];
    sortedData.sort((a, b) => (a.breeds?.[0]?.id < b.breeds?.[0]?.id ? 1 : -1));
    renderComponent(sortedData);
  }
};

// 15. searchPetByKey digunakan untuk melakukan search tanpa memanggil API, tetapi langsung
// dari nilai petList
const searchPetByKey = (key) => {
  // 15a. Menggunakan filter untuk mencocokkan pet dengan nama ras yang mengandung key yang diketikkan
  return petList.filter((pet) => pet.breeds?.[0]?.name.toLowerCase().includes(key.toLowerCase()));
};

dropdownElement.addEventListener('change', (event) => {
  // 16. Buat fungsi untuk sorting
  event.preventDefault();
  const value = event.target.value;
  // 16a. Panggil fungsi sort dengan parameter value di atas
  sortPetById(value);
});

formElement.addEventListener('submit', (event) => {
  // 17. Buat fungsi untuk melakukan search
  event.preventDefault();
  const value = searchInputElement.value;
  const filteredPet = searchPetByKey(value);
  // 17a. panggil fungsi untuk merender komponen dengan parameter:
  // - filteredPet : ketika length filteredPet lebih dari 0
  // - petList: ketika length filteredPet = 0
  renderComponent(filteredPet.length > 0 ? filteredPet : petList);
});

// 18. FUngsi redirectTo untuk pagination
const redirectTo = (page) => {
  // 18a. set searchparam "page" dengan nilai parameter page di atas
  searchParams.set('page', page);
  // 18b. redirect dengan search param yang sudah didefinisikan
  window.location.search = searchParams.toString();
};

prevPage.addEventListener('click', (event) => {
  event.preventDefault();
  // 19. jika currentPage > 1 redirect ke current page - 1 (jangan lupa parameter di parse ke number)
  // dengan memanggil fungsi redirectTo, else redirect ke halaman 1
  if (currentPage > 1) {
    redirectTo(currentPage - 1);
  } else {
    redirectTo(1);
  }
});

pageOne.addEventListener('click', (event) => {
  event.preventDefault();
  // 20. memanggil fungsi redirectTo ke halaman 1
  redirectTo(1);
});

pageTwo.addEventListener('click', (event) => {
  event.preventDefault();
  // 21. memanggil fungsi redirectTo ke halaman 2
  redirectTo(2);
});

pageThree.addEventListener('click', (event) => {
  event.preventDefault();
  // 22. memanggil fungsi redirectTo ke halaman 3
  redirectTo(3);
});

nextPage
