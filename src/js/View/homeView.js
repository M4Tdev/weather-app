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

export const renderGeoLocError = err => {
  const markup = `
		<div>
			<h2 class="geo-error">Enable Geolocation or GPS on your device</h2>
			<p class="err-msg"><span class="quote">"</span>${err}<span class="quote">"</span></p>
		</div>
	`;

  document
    .querySelector(`.${elementsString.current}`)
    .insertAdjacentHTML('beforeend', markup);
};

export const renderDeleteAllBtn = () => {
  const markup = `
		<button class="other-delete-all deleteAllSaved">Delete saved location</button>
	`;

  document
    .querySelector(`.${elementsString.otherLocationsList}`)
    .insertAdjacentHTML('beforeend', markup);
};

export const clearOther = () => {
  document.querySelector('.other-locations-list').innerHTML = '';
};

export const renderOtherLocationsMessage = () => {
  const markup = `
		<h3 class="other-message">Press button bellow to add new locations</h3>
	`;

  clearOther();

  document
    .querySelector(`.${elementsString.otherLocationsList}`)
    .insertAdjacentHTML('beforeend', markup);
};

export const renderOther = location => {
  const markup = `
		<div class="other-location" data-id=${location.id}>
			<div class="other-location-section">
				<h3 class="other-location-name">
					${location.name}
				</h3>
			</div>
			<div class="other-location-section other-location-weather">
				<img src="images/weather-icons/${location.weather[0].icon}.png" alt="${
    location.weather[0].icon
  }" class="weather-icon">
				<span class="weather-description">${location.weather[0].main}</span>
			</div>
			<div class="other-location-section">
				<span class="other-location-temperature">
					${Math.round(location.main.temp)}°C
				</span>
			</div>
		</div>
	`;

  document
    .querySelector('.other-locations-list')
    .insertAdjacentHTML('afterbegin', markup);
};

export const renderCurrent = weather => {
  const markup = `
		<div class="current-location" data-id="${weather.id}">
			<div class="current-location-name">
				<h2>${weather.name}</h2>
			</div>
			<div class="flex-container">
				<div class="current-location-weather">
					<img src="images/weather-icons/${
            weather.weather[0].icon
          }.png" alt="Weather Icon" class="weather-icon">
					<span class="weather-description">
					${weather.weather[0].main}
					</span>
				</div>

				<div class="current-location-temperature">
					<h2 class="temperature">${Math.floor(weather.main.temp)}°C</h2>
					<span class="min-max-temperature">
						min. ${Math.floor(
              weather.main.temp_min
            )}<span class="celsius">°C</span> • max. ${Math.round(
    weather.main.temp_max
  )}<span class="celsius">°C</span>
					</span>
				</div>
			</div>
		</div>
	`;

  document
    .querySelector(`.${elementsString.current}`)
    .insertAdjacentHTML('beforeend', markup);
};
