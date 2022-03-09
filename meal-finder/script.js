const searchInput = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__btn');
const shuffleBtn = document.querySelector('.shuffle-btn');
const resultsContainer = document.querySelector('.results');
const mealDetails = document.querySelector('.meal');

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
  // console.log(data);
  data.map((item) => {
    const list = document.createElement('li');
    list.classList.add('results__item');
    list.innerHTML = `
    <a href="#mealDetails">
        <div class="results__item-img-box">
            <img class="results__item-img" src="${item.strMealThumb}" alt="" />
        </div>
    </a>
    `;
    list.addEventListener('click', () => displayRecipe(item));
    resultsContainer.append(list);
  });
};

const displayRecipe = (meal) => {
  // console.log(meal);
  const ingArr = addIngredientsToArr(meal);
  // console.log(ingArr);
  mealDetails.innerHTML = `
    <h2 class="meal__title">${meal.strMeal}</h2>
    <div class="meal__img-box">
      <img class="meal__img" src="${meal.strMealThumb}" alt="">
    </div>
    <div class="meal__summary">
      <p class="meal__cat">${meal.strCategory}</p>
      <p class="meal__area">${meal.strArea}</p>
    </div>
    <div class="meal__instructions">${meal.strInstructions}</div>
    <h3>Ingredients</h3>
  `;

  const ingredients = document.createElement('div');
  mealDetails.append(ingredients);
  ingArr.map((ing) => {
    const ingBox = document.createElement('span');
    ingBox.classList.add('ingredient');
    ingBox.innerText = ing;
    ingredients.append(ingBox);
  });
};

const addIngredientsToArr = (meal) => {
  const ingArr = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingArr.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }
  return ingArr;
};

const getRandomMeal = async () => {
  const res = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const meal = res.data.meals[0];
  resultsContainer.innerHTML = '';
  displayRecipe(meal);
};

searchBtn.addEventListener('click', searchMeals);
shuffleBtn.addEventListener('click', getRandomMeal);