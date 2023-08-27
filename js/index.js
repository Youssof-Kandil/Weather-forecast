// Getting current position
const successCallBack = (position) => {
  console.log(position);
  getForeCast(`${position.coords.latitude},${position.coords.longitude}`);
};
const failCallBack = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallBack, failCallBack);

// Getting elements
let searchField = document.querySelector("#search");
let locationName = document.querySelector(".location");
//today
let today = document.querySelector("#today");
let todayFore = document.querySelector("#todayFore");
let todayDate = document.querySelector("#todayDate");
let todayCustom = document.querySelector("#todCustom");
let todayImg = document.querySelector("#todImg");
//tomm
let tommorow = document.querySelector("#tomm");
let tommUpper = document.querySelector("#tommUpper");
let tommLower = document.querySelector("#tommLower");
let tommCustom = document.querySelector("#tommCustom");
let tommImg = document.querySelector("#tommImg");
//afterTomm
let aftertomm = document.querySelector("#nextday");
let nextUpper = document.querySelector("#nextUpper");
let nextLower = document.querySelector("#nextLower");
let nextCustom = document.querySelector("#nextCustom");
let nextImg = document.querySelector("#nexImg");

searchField.addEventListener("keyup", function (info) {
  getForeCast(searchField.value);
});

async function getForeCast(place) {
  let apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1548f107fff1456a9f6133340232708&q=${place}&days=3`
  );
  let forecast = await apiResponse.json();
  console.log(forecast);
  display(forecast);
}

function display(forecast) {
  console.log(forecast.forecast.forecastday[1]);
  locationName.innerHTML = forecast.location.name;

  //today

  const todayDateString = forecast.forecast.forecastday[0].date; // Example date in YYYY-MM-DD format
  const toddate = new Date(todayDateString);
  const toddayName = getDayName(toddate);
  todayFore.innerHTML = forecast.current.temp_c;
  todayDate.innerHTML = forecast.forecast.forecastday[0].date;
  today.innerHTML = toddayName;
  todayCustom.innerHTML = forecast.current.condition.text;
  todayImg.src = forecast.current.condition.icon;

  //tomm
  const tommDateString = forecast.forecast.forecastday[1].date; // Example date in YYYY-MM-DD format
  const tommDate = new Date(tommDateString);
  const TommDayName = getDayName(tommDate);
  tommUpper.innerHTML = forecast.forecast.forecastday[1].day.maxtemp_c;
  tommLower.innerHTML = forecast.forecast.forecastday[1].day.mintemp_c;
  tommorow.innerHTML = TommDayName;
  tommCustom.innerHTML = forecast.forecast.forecastday[1].day.condition.text;
  tommImg.src = forecast.forecast.forecastday[1].day.condition.icon;
  //nextDay
  const nextDateString = forecast.forecast.forecastday[2].date; // Example date in YYYY-MM-DD format
  const nextDate = new Date(nextDateString);
  const nextDayName = getDayName(nextDate);
  nextUpper.innerHTML = forecast.forecast.forecastday[2].day.maxtemp_c;
  nextLower.innerHTML = forecast.forecast.forecastday[2].day.mintemp_c;
  nextDate.innerHTML = nextDayName;
  nextCustom.innerHTML = forecast.forecast.forecastday[2].day.condition.text;
  nextImg.src = forecast.forecast.forecastday[2].day.condition.icon;
}
function getDayName(date) {
  const options = { weekday: "long" };
  const dayName = new Intl.DateTimeFormat("en-US", options).format(date);
  return dayName;
}
