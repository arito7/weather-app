import WeatherCard from './components/weather-card.js';

(() => {
  const CSS = { selected: 'selected' };
  const API_KEY = '&appid=ff8c40e7fd6aa969c8f43c700c06f2e9';
  const QUERY_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const QUERY_UNITS = '&units=';
  const UNITS = { C: 'metric', F: 'imperial' };
  const states = {
    unit: 'metric',
    symbol: 'C',
  };
  const currentCity = document.querySelector('.current-city');
  const selectedTemp = document.querySelector('.selected-temp');
  const selectedHigh = document.querySelector('.temp-high');
  const selectedLow = document.querySelector('.temp-low');
  const humidity = document.querySelector('.humidity');
  const dailyWeatherContainer = document.querySelector(
    '.daily-weather-container'
  );
  const nodeSearchBtn = document.querySelector('.search-button');
  const nodeInputField = document.querySelector('.input');
  const nodesUnitBtns = document.querySelectorAll('.unit-button');
  const nodeWeather = document.querySelector('.weather');

  // FUNCTIONS
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  async function getWeatherAndRender(city) {
    async function getDetailedWeather(lat, lon) {
      const exclusions = '&exclude=minutely';
      try {
        let data = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}${exclusions}${QUERY_UNITS}${states.unit}${API_KEY}`
        );
        data = await data.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    async function getWeather(city) {
      try {
        let data = await fetch(
          `${QUERY_URL}${city}${API_KEY}${QUERY_UNITS}${states.unit}`
        );
        data = await data.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
    function render(city, data, dailyData) {
      const day = new Date().getDay();
      while (dailyWeatherContainer.hasChildNodes()) {
        dailyWeatherContainer.removeChild(dailyWeatherContainer.firstChild);
      }
      for (let i = 0; i < dailyData.daily.length - 1; i += 1) {
        const dayCard = WeatherCard((day + i) % 7, dailyData.daily[i]);
        dailyWeatherContainer.appendChild(dayCard);
      }
      currentCity.textContent = city;
      nodeWeather.textContent = data.weather[0].main;
      selectedTemp.textContent = `${data.main.temp}°C`;
      selectedHigh.textContent = `High ${data.main.temp_max}°C`;
      selectedLow.textContent = `Low ${data.main.temp_min}°C`;
      humidity.textContent = ` Humidity ${data.main.humidity}`;
    }

    let weather = await getWeather(city);
    console.log(weather);
    let dailyWeather = await getDetailedWeather(
      weather.coord.lat,
      weather.coord.lon
    );
    render(weather.name, weather, dailyWeather);
    console.log(dailyWeather);
  }

  function unitBtnClickHandler(e) {
    nodesUnitBtns.forEach((btn) => {
      btn.classList.toggle(CSS.selected);
    });
    states.unit = UNITS[e.target.textContent];
    if (nodeInputField.value) {
      getWeatherAndRender(nodeInputField.value);
    }
  }

  nodesUnitBtns.forEach((btn) => {
    btn.addEventListener('click', unitBtnClickHandler);
  });

  nodeSearchBtn.addEventListener('click', () => {
    if (nodeInputField.value) {
      getWeatherAndRender(nodeInputField.value);
    }
  });

  getWeatherAndRender('tokyo');
})();
