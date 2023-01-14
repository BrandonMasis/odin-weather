//7d1ffd6560690da6ff7efa90512167d5 open weather
//k7WnzAmX7qJrZQRUDqSejXSk6POdUxYz giphy

async function requestWeather(query) {
  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=7d1ffd6560690da6ff7efa90512167d5 `
    );

    const weatherData = await weatherResponse.json();
    return weatherData;
  } catch {
    return;
  }
}

async function requestGif(query) {
  const giphyResponse = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=k7WnzAmX7qJrZQRUDqSejXSk6POdUxYz&s=${query}`,
    {
      mode: 'cors',
    }
  );

  const giphyData = await giphyResponse.json();

  return giphyData;
}

const searchQuery = document.querySelector('#search-query');
const searchBtn = document.querySelector('#search-btn');
const image = document.querySelector('.img-container img');

const country = document.querySelector('#country');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');

const minTemperature = document.querySelector('#min-temperature');
const maxTemperature = document.querySelector('#max-temperature');
const feelsTemperature = document.querySelector('#feels-temperature');

const windSpeed = document.querySelector('#wind-speed');
const humidity = document.querySelector('#humidity');

async function displayData() {
  try {
    let query = searchQuery.value;
    let weatherData = await requestWeather(query);

    let gifData;

    console.log(weatherData.name);
    if (weatherData.name != undefined) {
      gifData = await requestGif(weatherData.name);
    } else {
      return;
    }

    image.src = `${gifData.data.images.original.url}`;

    console.log(weatherData);
    country.textContent = weatherData.sys.country;
    city.textContent = weatherData.name;
    temperature.textContent = `${toCelcius(weatherData.main.temp).toFixed(
      1
    )} C° / ${toFahrenheit(weatherData.main.temp).toFixed(1)} F° `;

    minTemperature.querySelector('h3:nth-child(2)').textContent = `${toCelcius(
      weatherData.main.temp_min
    ).toFixed(1)} C°`;

    minTemperature.querySelector(
      'h3:nth-child(3)'
    ).textContent = `${toFahrenheit(weatherData.main.temp_min).toFixed(1)} F°`;

    maxTemperature.querySelector('h3:nth-child(2)').textContent = `${toCelcius(
      weatherData.main.temp_max
    ).toFixed(1)} C°`;

    maxTemperature.querySelector(
      'h3:nth-child(3)'
    ).textContent = `${toFahrenheit(weatherData.main.temp_max).toFixed(1)} F°`;

    feelsTemperature.querySelector(
      'h3:nth-child(2)'
    ).textContent = `${toCelcius(weatherData.main.feels_like).toFixed(1)} C°`;

    feelsTemperature.querySelector(
      'h3:nth-child(3)'
    ).textContent = `${toFahrenheit(weatherData.main.feels_like).toFixed(
      1
    )} F°`;

    windSpeed.textContent = `Wind speed: ${metersPerSecondToKilometersPerHour(
      weatherData.wind.speed
    ).toFixed(1)} KM/H `;

    humidity.textContent = `Humidity: ${weatherData.main.humidity}% `;
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener('click', () => {
  displayData();
});

function toCelcius(kelvin) {
  return kelvin - 273.15;
}

function toFahrenheit(kelvin) {
  return 1.8 * (kelvin - 273) + 32;
}

function metersPerSecondToKilometersPerHour(value) {
  return (value * 18) / 5;
}

searchQuery.value = 'San francisco';
displayData();
