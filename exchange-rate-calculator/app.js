const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
    const currency_base = currencyEl_one.value;
    const currency_target = currencyEl_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/${exchangeApiKey}/pair/${currency_base}/${currency_target}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rate
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
            rateEl.innerText = `1 ${currency_base} = ${rate} ${currency_target}`
        })
}

currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)


swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate()
})

calculate()