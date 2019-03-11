import Current from './Model/Current';
import Search from './Model/Search';
import Other from './Model/Other';
import Saved from './Model/Saved';
import Forecast from './Model/Forecast';
import * as homeView from './View/homeView';
import * as searchView from './View/searchView';
import * as forecastView from './View/forecastView';
import * as base from './View/base';
import '../css/main.scss';

// State
const state = {};

const controlCurrent = async () => {
  // Check if there is no state.current
  if (!state.current) {
    state.current = new Current();
  }

  // render loader
  base.renderLoader(document.querySelector(`.${base.elementsString.current}`));

  // awaiting navigator to get permission to get users location
  try {
    await state.current.getLocation();
  } catch (err) {
    // console.log(err);
    base.clearLoader(`.${base.elementsString.current}`);
    homeView.renderGeoLocError(err.message);
    return;
  }

  // awaiting for response from weather api
  await state.current.getWeather();

  // clearing loader
  base.clearLoader(`.${base.elementsString.current}`);

  // render current location weather
  homeView.renderCurrent(state.current.weather);
};

const controlSaved = () => {
  if (!state.saved) {
    state.saved = new Saved();
  }

  // if there is savedLocations in localStorage then it will load
  if (localStorage.savedLocations) {
    state.saved.readFromLocal();
  }
};

const controlOther = async () => {
  if (!state.other) {
    state.other = new Other();
  }

  state.other.clearWeather();

  if (state.saved.saved.length !== 0) {
    // render loader
    base.renderLoader(
      document.querySelector(`.${base.elementsString.otherLocationsList}`)
    );

    // using for of loops so I can use await
    for (const id of state.saved.saved) {
      await state.other.getWeather(id);
    }

    // clearing loader
    base.clearLoader(`.${base.elementsString.otherLocationsList}`);

    for (const [index, location] of Object.entries(state.other.weather)) {
      await homeView.renderOther(location);
    }

    // rendering delete button under all saved locations
    homeView.renderDeleteAllBtn();
  } else {
    homeView.renderOtherLocationsMessage();
  }
};

const controlHome = () => {
  // render homeView
  homeView.renderHome();

  controlCurrent();

  controlSaved();

  controlOther();
};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    // check if loader is already rendered
    const resultsElement = document.querySelector(
      `.${base.elementsString.results}`
    );

    // loader will render only if it is not already rendered
    if (!resultsElement.contains(document.querySelector('.lds-ellipsis'))) {
      searchView.clearResults();

      base.renderLoader(
        document.querySelector(`.${base.elementsString.results}`)
      );
    }

    try {
      await state.search.searchQuery();
    } catch (err) {
      base.clearLoader(`.${base.elementsString.results}`);
      searchView.renderError();
      console.log(err);
    }
    // clearing loader
    base.clearLoader(`.${base.elementsString.results}`);

    if (state.search.result) {
      // clearing displayed results to prepare div for next search
      searchView.clearResults();

      state.search.result.forEach(loc => {
        searchView.renderSearchResults(loc, state.saved.isSaved(loc.id));
      });
    }
  }
};

const controlForecast = async (id, type) => {
  if (!state.forecast) state.forecast = new Forecast();

  state.forecast.setID(id);

  state.forecast.setType(type);

  state.forecast.clearWeather();

  // clear main container
  base.clearMain();

  // display forecast view
  forecastView.renderForecast(state.forecast.type);

  base.renderLoader(
    document.querySelector(`.${base.elementsString.forecastDays}`)
  );

  await state.forecast.getWeather(state.forecast.id);

  base.clearLoader(`.${base.elementsString.forecastDays}`);

  // render weather
  state.forecast.weather.forEach(weather =>
    forecastView.renderWeather(weather, state.forecast.city)
  );
};

/**
 * EVENT LISTENERS
 */

// Loading HOME view on page load
window.addEventListener('load', controlHome);

document.addEventListener('click', e => {
  const currentLocation = e.target.closest('.current-location');
  const addLocationBtn = e.target.closest(
    `.${base.elementsString.addLocationBtn}`
  );
  const closeBtn = e.target.closest('.close-button');
  const searchResult = e.target.closest('.result');
  const deleteAllSavedBtn = e.target.closest('.deleteAllSaved');
  const otherLocation = e.target.closest('.other-location');
  const deleteLocalizationBtn = e.target.closest('.delete-location-btn');
  const forecastDay = e.target.closest('.day');
  const forecastDayCloseBtn = e.target.closest('.close-advanced-button');

  if (currentLocation) {
    const { id } = currentLocation.dataset;

    controlForecast(id, 'current');
  }

  if (addLocationBtn) {
    base.clearMain();

    searchView.renderSearch();

    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      controlSearch();
    });

    // SEARCH ON KEYUP while typing
    // searchForm.addEventListener('keyup', e => {
    //   e.preventDefault();
    //   controlSearch();
    // });
  }

  if (closeBtn) {
    // clear main container
    base.clearMain();

    // render homeView
    controlHome();
  }

  if (searchResult) {
    const { id } = e.target.dataset;

    // checking if isSaved if yes click on it will remove it from saved
    if (state.saved.isSaved(parseInt(id)) === -1) {
      // add location id to saved state
      state.saved.addToSaved(id);
    } else {
      // remove location from saved
      state.saved.deleteFromSaved(id);
    }

    // persist saved location ids to localStorage
    state.saved.saveToLocal();

    // clear main container
    base.clearMain();

    // render homeView
    controlHome();
  }

  if (otherLocation) {
    const { id } = e.target.closest('.other-location').dataset;

    controlForecast(id, 'other');
  }

  if (deleteLocalizationBtn) {
    const { id } = state.forecast;

    state.saved.deleteFromSaved(id);

    state.saved.saveToLocal();

    base.clearMain();

    controlHome();
  }

  if (deleteAllSavedBtn) {
    homeView.renderOtherLocationsMessage();

    state.saved.deleteAllSaved();
  }

  if (forecastDay) {
    const { id } = forecastDay.dataset;

    const dayIndex = state.forecast.weather.findIndex(
      day => day.dt === parseInt(id)
    );

    base.clearMain();

    const { city } = state.forecast;
    const weather = state.forecast.weather[dayIndex];

    forecastView.renderAdvanced(city, weather);
  }

  if (forecastDayCloseBtn) {
    // clear main
    base.clearMain();

    // take id and type from current forecasted city
    const { id } = state.forecast.city;
    const { type } = state.forecast;

    // pass id and type to forecast controller to display forecast again
    controlForecast(id, type);
  }
});

/**
 * FOR DEVELOPMENT
 */

// Setting state on window for development purposes
// window.state = state;
