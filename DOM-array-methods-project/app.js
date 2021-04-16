const main = document.querySelector('#main')
const addUserBtn = document.querySelector('#add-user')
const doubleBtn = document.querySelector('#double')
const showMillionairesBtn = document.querySelector('#show-millionaires')
const sortBtn = document.querySelector('#sort')
const calculateWealthBtn = document.querySelector('#calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: formatMoney(Math.floor(Math.random() * 1000000 + 1))
    }
    addData(newUser)
}

function doubleMoney() {
    data = data.map(user => {
        return {
            ...user, money,
            money: user.money * 2
        }
    })
    updateDOM()
}

// add new obj to data arr
function addData(obj) {
    data.push(obj)

    updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
        main.appendChild(element)
    })
}

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// add event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);