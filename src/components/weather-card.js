export default (dayIndex, dayData) => {
  // CREATE DOM ELEMENTS
  const tempString = (deg) => `${deg}°C`;

  const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const container = document.createElement('div');
  const day = document.createElement('h2');
  const weather = document.createElement('p');
  const icon = document.createElement('i');
  const temp = document.createElement('h4');

  // ADD CSS CLASSES
  container.classList.add('day-card');
  day.classList.add('day');
  weather.classList.add('weather');
  temp.classList.add('temperature');

  day.textContent = DAYS[dayIndex];
  weather.textContent = dayData.weather[0].main;
  icon.classList.add('wi', `wi-owm-${dayData.weather[0].id}`, 'weather-icon');
  temp.textContent = tempString(dayData.temp.day);

  container.appendChild(day);
  container.appendChild(weather);
  container.appendChild(icon);
  container.appendChild(temp);
  return container;
};
