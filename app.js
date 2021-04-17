// selectors
const form = document.getElementById('form');
const userSearch = document.getElementById('user-search');

const image = document.getElementById('weather-condition-image');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const country = document.getElementById('country');
const description = document.getElementById('description');

const API_KEY = `31302ed219f4d1979cac211e681c76c5`;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const IMAGE_URL = `http://openweathermap.org/img/wn`;
const DEFAULT_CITY = `DHAKA,BD`;

// got location from user and set city name
window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      getWeatherData(null, success.coords);
    },
    (err) => {
      console.log(err.message);
      getWeatherData();
    }
  );

  // got city name from user
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (userSearch.value.trim() === '') {
      alert('Enter Your City Name');
    } else {
      getWeatherData(userSearch.value);
      userSearch.value = '';
    }
  });
};

// get weather data
function getWeatherData(city = DEFAULT_CITY, coords) {
  let url = BASE_URL;
  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${url}&q=${city}`);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let weather = {
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp - 273.15),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      setWeather(weather);
    })
    // Handle Error
    .catch((err) => {
      console.log(err);
      alert('City Not Found');
    });
}

// set weather data
function setWeather(weather) {
  image.src = `${IMAGE_URL}/${weather.icon}@2x.png`;
  temp.innerHTML = weather.temp;
  city.innerHTML = weather.city;
  country.innerHTML = weather.country;
  description.innerHTML = weather.description;

  // Dynamic title
  document.title = `${weather.city} Weather`;
}
