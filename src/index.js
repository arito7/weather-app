(() => {
  const API_KEY = '&appid=ff8c40e7fd6aa969c8f43c700c06f2e9';
  const QUERY_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  const QUERY_UNITS = '&units=';
  const UNITS = { c: 'metric', f: 'standard', k: 'imperial' };

  // getWeather('tokyo').then(updateElements);

  // FUNCTIONS
  async function getWeather(city, unit = 'metric') {
    try {
      const data = await fetch(
        `${QUERY_URL}${city}${API_KEY}${QUERY_UNITS}${unit}`
      );
      return data.json();
    } catch (err) {
      console.error(err);
    }
  }
  const unitBtns = document.querySelectorAll('.unit-button');

  unitBtns.forEach((btn) => {
    btn.addEventListener('click', unitBtnClickHandler);
  });
  function updateElements(data) {
    console.log(data);
  }

  function unitBtnClickHandler(e) {
    e.target.classList.add(CSS.selected);
  }
  const searchBtn = document.querySelector('.search-button');
  const inputField = document.querySelector('.input');
  searchBtn.addEventListener('click', () => {
    if (inputField.value) {
      getWeather(inputField.value).then((v) => {
        updateElements(v);
      });
    }
  });
})();
