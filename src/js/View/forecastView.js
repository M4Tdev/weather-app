import { elements, elementsString } from './base';

/**
 * MAYBE TODO:
 * display city name above weather or just 'Forecast'
 */

export const renderForecast = city => {
  const markup = `
		<div class="forecast-nav">
			<img src="images/placeholder.svg" alt="Location icon" class="location-icon" />
			<div class="forecast-city-name">
				Forecast
			</div>
			<button class="close-button">
				<img src="images/close.svg" alt="Close icon" class="close-forecast-btn-icon">
			</button>
		</div>

		<div class="forecast-days">



		</div>
	`;

  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};

export const renderWeather = (weather, city) => {
  const markup = `
		<div class="day">
			<span class="date">${weather.dt_txt}</span>
			<div class="day-section">
				<h2 class="day-section-city-name">${city.name}</h2>
			</div>
			<div class="day-section">
				<div class="day-section-weather">
					<img src="images/weather-icons/${
            weather.weather[0].icon
          }.png" alt="Weather icon" class="day-section-weather-icon">
					<span class="day-section-weather-description">${
            weather.weather[0].description
          }</span>
				</div>
			</div>
			<div class="day-section">
				<div class="day-section-temperature">
					<span class="day-section-main-temperature">${Math.round(
            weather.main.temp
          )}°C</span>
					<span class="day-section-min-max-temperature">${Math.round(
            weather.main.temp_min
          )} • ${Math.round(weather.main.temp_max)}</span>
				</div>
			</div>
		</div>
	`;

  document
    .querySelector(`.${elementsString.forecastDays}`)
    .insertAdjacentHTML('beforeend', markup);
};
