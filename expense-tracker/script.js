const textInput = document.querySelector('.form__text-input');
const amtInput = document.querySelector('.form__amt-input');
const submitBtn = document.querySelector('.form__btn');
const balanceDisplay = document.querySelector('.summary__balance-amt');
const incomeDisplay = document.querySelector('.summary__income');
const expenseDisplay = document.querySelector('.summary__expense');
const history = document.querySelector('.history__list');

// Bugs:
// 1. cannot added transactions with the same name
//    solution: change data structure to an array of objects. add transaction IDs: remove transactions by locating IDs
// 2. user can add empty transactions
//    solution: validate user input values which cannot be empty strings

const getLocalStorageData = () => {
  return localStorage.getItem('transactions')
    ? JSON.parse(localStorage.getItem('transactions'))
    : [];
};

const getData = () => {
  history.innerHTML = '';
  let balance = 0,
    income = 0,
    expense = 0;

  const data = getLocalStorageData();
  data.forEach((item) => {
    const value = item.amt;
    balance += value;
    value >= 0 ? (income += value) : (expense += value);
    addToHistory(item);
  });

  balanceDisplay.innerText = `$${balance.toFixed(2)}`;
  incomeDisplay.innerText = `$${income.toFixed(2)}`;
  expenseDisplay.innerText = `$${expense.toFixed(2)}`;
};

const postTransaction = (event) => {
  event.preventDefault();

  if (textInput.value.trim() === '' || amtInput.value.trim() === '') {
    alert('Please enter valid transaction name and amount.');
  } else {
    const transaction = {
      id: generateId(),
      name: textInput.value,
      amt: parseInt(amtInput.value),
    };

    const data = getLocalStorageData();
    data.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(data));
    getData();
  }

  textInput.value = '';
  amtInput.value = '';
};

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

const addToHistory = (item) => {
  const name = item.name;
  const amt = item.amt;
  const list = document.createElement('li');
  list.classList.add('history__item');
  list.innerHTML = `
    <button type="button" class="history__item-btn hidden">X</button>
    <p class="history__item-title">${name}</p>
    <p class="history__item-amt" >${amt > 0 ? `+${amt}` : amt}</p>
    <div class="history__item-mark ${amt > 0 ? 'green' : 'red'}"></div>
  `;
  history.append(list);

  const removeItemBtn = list.querySelector('.history__item-btn');
  removeItemBtn.addEventListener('click', () => removeItem(item.id));
};

const removeItem = (id) => {
  const data = JSON.parse(localStorage.getItem('transactions'));
  const updatedTrans = data.filter((item) => item.id !== id);
  localStorage.setItem('transactions', JSON.stringify(updatedTrans));
  getData();
};

getData();
submitBtn.addEventListener('click', postTransaction);