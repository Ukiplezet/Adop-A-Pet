const DOG_BREEDS_URL = `https://dog.ceo/api/breeds/list/all`;
const CATS_BREEDS_API = `https://api.thecatapi.com/v1/breeds`;

const fetchDogBreeds = async () => {
  const select = document.querySelector(".breeds");

  await fetch(DOG_BREEDS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const breedsObject = data.message;
      const breedsArray = Object.keys(breedsObject);

      for (let i = 0; i < breedsArray.length; i++) {
        const option = document.createElement(`option`);
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
      }
    });
};

export const fetchCatsBreeds = async () => {
  const select = document.querySelector(".breeds");

  await fetch(CATS_BREEDS_API)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement(`option`);
        option.value = data[i].name;
        option.innerText = data[i].name;
        select.appendChild(option);
      }
    });
};

export default fetchDogBreeds;
