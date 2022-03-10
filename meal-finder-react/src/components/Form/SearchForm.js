import { useState } from 'react';
import axios from 'axios';

import FormInput from './FormInput';
import Button from '../Button/Button';
import classes from './SearchForm.module.css';

const SearchForm = (props) => {
  const [enteredValue, setEnteredValue] = useState('');

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const link = `${props.link}${enteredValue}`;
    const res = await axios.get(link);
    props.onResults(res);
    props.onSearchTerm(enteredValue);
  };

  return (
    <form action="" className={classes['search-form']}>
      <FormInput
        type="text"
        name="search-input"
        className={classes['search-form__input']}
        onChange={valueChangeHandler}
        placeholder="Search for meals or keywords"
      />
      <Button type="submit" className="" onClick={formSubmitHandler}>
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
