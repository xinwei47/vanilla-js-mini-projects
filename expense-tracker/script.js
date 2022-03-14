const textInput = document.querySelector('.form__text-input');
const amtInput = document.querySelector('.form__amt-input');
const submitBtn = document.querySelector('.form__btn');
const balanceDisplay = document.querySelector('.summary__balance-amt');
const incomeDisplay = document.querySelector('.summary__income');
const expenseDisplay = document.querySelector('.summary__expense');
const history = document.querySelector('.history__list');

const getData = () => {
  history.innerHTML = '';
  let balance = 0,
    income = 0,
    expense = 0;

  const data = localStorage.getItem('transactions')
    ? JSON.parse(localStorage.getItem('transactions'))
    : {};

  for (let item in data) {
    const value = data[item];
    balance += value;
    value >= 0 ? (income += value) : (expense += value);
    addToHistory(item, value);
  }

  balanceDisplay.innerText = `$${balance.toFixed(2)}`;
  incomeDisplay.innerText = `$${income.toFixed(2)}`;
  expenseDisplay.innerText = `$${expense.toFixed(2)}`;
};

const postTransaction = (event) => {
  event.preventDefault();
  const item = textInput.value;
  const amt = parseInt(amtInput.value);

  const data = JSON.parse(localStorage.getItem('transactions'));
  data[item] = amt;
  localStorage.setItem('transactions', JSON.stringify(data));
  getData();
};

const addToHistory = (item, amt) => {
  const list = document.createElement('li');
  list.classList.add('history__item');
  list.innerHTML = `
    <button type="button" class="history__item-btn hidden">X</button>
    <p class="history__item-title">${item}</p>
    <p class="history__item-amt" >${amt > 0 ? `+${amt}` : amt}</p>
    <div class="history__item-mark ${amt > 0 ? 'green' : 'red'}"></div>
  `;
  history.append(list);

  const removeItemBtn = list.querySelector('.history__item-btn');
  removeItemBtn.addEventListener('click', () => removeItem(item));
};

const removeItem = (key) => {
  const data = JSON.parse(localStorage.getItem('transactions'));
  delete data[key];
  localStorage.setItem('transactions', JSON.stringify(data));
  getData();
};

getData();
submitBtn.addEventListener('click', postTransaction);
