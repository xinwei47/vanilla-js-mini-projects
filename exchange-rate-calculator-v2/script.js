// fetch data
// https://v6.exchangerate-api.com/v6/3ef707924c60df04261ba112/latest/${USD}

// find the corresponding conversion rate
// calculate converted currency amount

const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');
const rate = document.querySelector('#rate');
const swap = document.querySelector('#swap');

async function fetchData(baseCurrency) {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/3ef707924c60df04261ba112/latest/${baseCurrency}`
  );
  const data = await response.json();
  return data.conversion_rates;
}

async function updateResults() {
  let baseCurrency = currencyOne.value;
  let toCurrency = currencyTwo.value;

  const rates = await fetchData(baseCurrency);
  const convesionRate = rates[toCurrency];
  // update conversion rate
  rate.innerText = `1 ${baseCurrency} = ${convesionRate} ${toCurrency}`;
  // update amount
  amountTwo.value = +amountOne.value * +convesionRate;
}

function swapCurrency() {
  let temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  updateResults();
}

currencyOne.addEventListener('change', updateResults);
currencyTwo.addEventListener('change', updateResults);
amountOne.addEventListener('change', updateResults);
amountTwo.addEventListener('change', updateResults);
swap.addEventListener('click', swapCurrency);

updateResults();
