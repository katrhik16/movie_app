const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.Occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();

//this is grab the price of the ticket which is included in the function
let ticketPrice = +movieSelect.value;
//adding + sign makes it a num 4m strng
//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
  console.log(movieIndex, moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select  event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData = (e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// selecting a seat will trigger the same color as the option below the screen
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("Occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});
updateSelectedCount();
