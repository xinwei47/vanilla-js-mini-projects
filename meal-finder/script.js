const searchInput = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__btn');
const resultsContainer = document.querySelector('.results');

const searchMeals = async (e) => {
  e.preventDefault();
  const term = searchInput.value;

  const res = await axios.get(
    `http://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const meals = res.data.meals;
  displayResults(meals);
};

const displayResults = (data) => {
  console.log(data);
  data.map((item) => {
    const list = document.createElement('li');
    list.classList.add('results__item');
    list.innerHTML = `
    <a href="${item.strSource}">
        <div class="results__item-img-box">
            <img class="results__item-img" src="${item.strMealThumb}" alt="" />
        </div>
    </a>
    `;

    resultsContainer.append(list);
  });
};

searchBtn.addEventListener('click', searchMeals);
