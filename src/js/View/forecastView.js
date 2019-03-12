import moment from 'moment';
import { elements, elementsString } from './base';

export const renderForecast = type => {
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

		<div class="del-btn">
		${
      type === 'other'
        ? `
			<button class="delete-location-btn">Delete location</button>
      `
        : ''
    }
		</div>

		<div class="forecast-days">



		</div>
	`;

  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};

export const renderWeather = (weather, city) => {
  const date = moment.unix(weather.dt).format('dddd, L, h:mm:ss a');
  const markup = `
		<div class="day" data-id="${weather.dt}">
			<span class="date">${date}</span>
			<div class="day-section">
				<h2 class="day-section-city-name">${city.name}</h2>
			</div>
			<div class="day-section">
				<div class="day-section-weather">
					<img src="images/weather-icons/${
            weather.weather[0].icon
          }.png" alt="Weather icon" class="day-section-weather-icon">
					<span class="day-section-weather-description">${weather.weather[0].main}</span>
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

export const renderAdvanced = (city, weather) => {
  const date = moment.unix(weather.dt).format('L, h:mm:ss a');
  const day = moment.unix(weather.dt).format('dddd');

  const markup = `
		<div class="advanced">
			<div class="advanced-date">
				${date}
				<span class="day">
					${day}
				</span>
			</div>
			<button class="close-advanced-button">
				<img src="images/close.svg" alt="Close button" class="close-advanced-btn">
			</button>
			<div class="advanced-info">
				<div class="section city-name">${city.name}</div>
				<div class="section weather">
					<img src="images/weather-icons/${
            weather.weather[0].icon
          }.png" alt="" class="weather-icon">
					<span class="weather-desc">${weather.weather[0].main}</span>
				</div>
				<div class="section temp">
					<span class="main-temp">${Math.round(weather.main.temp)}°C</span>
					<span class="min-max-temp">
						min. ${Math.round(weather.main.temp_min)} • max. ${Math.round(
    weather.main.temp_max
  )}
					</span>
				</div>
			</div>
			<div class="advanced-more-info">
				<div class="section">
					<span class="more-info-name">Temperature: </span>
					<span class="more-info-value">${Math.round(weather.main.temp)}°C</span>
				</div>
				<div class="section">
					<span class="more-info-name">Lowest Temperature: </span>
					<span class="more-info-value">${Math.round(weather.main.temp_min)}°C</span>
				</div>
				<div class="section">
					<span class="more-info-name">Highest Temperature: </span>
					<span class="more-info-value">${Math.round(weather.main.temp_max)}°C</span>
				</div>
				<div class="section">
					<span class="more-info-name">Wind Speed: </span>
					<span class="more-info-value">${weather.wind.speed}km/h</span>
				</div>
				<div class="section">
					<span class="more-info-name">Humidity: </span>
					<span class="more-info-value">${weather.main.humidity}%</span>
				</div>
				<div class="section">
					<span class="more-info-name">Pressure: </span>
					<span class="more-info-value">${weather.main.pressure}hPa</span>
				</div>
			</div>
		</div>
	`;

  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};
