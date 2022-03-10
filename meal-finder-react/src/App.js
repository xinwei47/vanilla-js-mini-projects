import { useRef, useState } from 'react';
import Button from './components/Button/Button';
import SearchForm from './components/Form/SearchForm';
import Gallery from './components/Gallery/Gallery';

const App = () => {
  const [mealsFound, setMealsFound] = useState(false);
  const [meals, setMeals] = useState([]);
  const [term, setTerm] = useState('');

  const getRandomMealHandler = () => {
    console.log('shuffle clicked');
  };

  const resultsHandler = (res) => {
    const meals = res.data.meals;
    console.log(meals);
    if (meals.length > 0) {
      setMeals(meals);
      setMealsFound(true);
    }
  };

  const searchTermHandler = (term) => {
    setTerm(term);
  };

  return (
    <>
      <h1 className="heading--1">Recipe Finder</h1>
      <section className="find-meals">
        <SearchForm
          link="https://www.themealdb.com/api/json/v1/1/search.php?s="
          onResults={resultsHandler}
          onSearchTerm={searchTermHandler}
        />
        <Button type="button" onClick={getRandomMealHandler}>
          Shuffle
        </Button>
      </section>
      {mealsFound && <div>Meals Found</div>}

      <section>
        <h2 className="heading--2">Search Results for "{term}"</h2>
        <Gallery data={meals} />
      </section>
    </>
  );
};

export default App;
