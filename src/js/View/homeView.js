import { elements, elementsString } from './base';

export const renderHome = () => {
  const markup = `
		<div class="current-location-box">
			<div class="current-location-icon">
				<img src="images/compass.svg" alt="Compass Icon" class="icon">
			</div>

		</div>

		<div class="other-locations">
      <h2>Other locations</h2>
      <div class="other-locations-list">

      </div>
      <button class="add-other-location-btn">
        <img src="images/plus.svg" alt="Plus icon" class="add-btn-icon">
      </button>
    </div>
	`;

  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};

export const renderCurrent = weather => {
  const markup = `
		<div class="current-location-name">
			<h2>${weather.name}</h2>
		</div>
		<div class="flex-container">
			<div class="current-location-weather">
				<img src="images/weather-icons/sun black.svg" alt="Weather Icon" class="weather-icon">
				<span class="weather-description">
				${weather.weather[0].description}
				</span>
			</div>

			<div class="current-location-temperature">
				<h2 class="temperature">${Math.floor(weather.main.temp)}°C</h2>
				<span class="min-max-temperature">
					min. ${Math.floor(
            weather.main.temp_min
          )}<span class="celsius">°C</span> • max. ${Math.floor(
    weather.main.temp_max
  )}<span class="celsius">°C</span>
				</span>
			</div>
		</div>
	`;

  document
    .querySelector(`.${elementsString.current}`)
    .insertAdjacentHTML('beforeend', markup);
};
