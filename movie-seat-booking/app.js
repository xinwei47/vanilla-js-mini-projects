const selectMovie = document.querySelector('#selectMovie');
const seatingArea = document.querySelector('#seatingArea')
const seats = document.querySelectorAll('#seatingArea .seat:not(.occupied)')
const numOfSeats = document.querySelector('#numOfSeats');
const totalCost = document.querySelector('#totalCost')

populateUI();

let ticketPrice = + selectMovie.value;

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateOverview() {
    const selectedSeats = document.querySelectorAll('#seatingArea .seat.selected');

    // nodelist is not an array and you cannot use common array methods (map, filter...)
    // however, it is iterable
    // save the selected seats index to local storage
    // use JSON.stringify to store the array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    numOfSeats.innerText = selectedSeatsCount;
    totalCost.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex) {
        selectMovie.selectedIndex = selectedMovieIndex;

    }
}

selectMovie.addEventListener('change', (event) => {
    ticketPrice = + event.target.value
    setMovieData(event.target.selectedIndex, event.target.value)
    updateOverview();
})

seatingArea.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateOverview();
    }
})

updateOverview();