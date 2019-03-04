import Current from './Model/Current';
import Search from './Model/Search';
import * as homeView from './View/homeView';
import * as searchView from './View/searchView';
import * as base from './View/base';
import '../css/main.scss';

// State
const state = {};

const controlCurrent = async () => {
  // Check if there is no state.current
  if (!state.current) {
    state.current = new Current();
  }

  // render homeView
  homeView.renderHome();

  // render loader
  base.renderLoader(document.querySelector(`.${base.elementsString.current}`));

  // awaiting navigator to get permission to get users location
  try {
    await state.current.getLocation();
  } catch (err) {
    /**
     * TODO:
     * render error message when user denied getting his location
     */
    console.log(err);
    base.clearLoader();
    return;
  }

  // awaiting for response from weather api
  await state.current.getWeather();

  // clearing loader
  base.clearLoader();

  // render current location weather
  homeView.renderCurrent(state.current.weather);
};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    // check if loader is already rendered
    const resultsElement = document.querySelector(
      `.${base.elementsString.results}`
    );

    if (!resultsElement.contains(document.querySelector('.lds-ellipsis'))) {
      base.renderLoader(
        document.querySelector(`.${base.elementsString.results}`)
      );
    }

    try {
      await state.search.searchQuery();
    } catch (err) {
      base.clearLoader();
      searchView.renderError(err.message);
    }
    // clearing loader
    base.clearLoader();

    // clearing displayed results to prepare div for next search
    searchView.clearResults();

    searchView.renderSearchResults(state.search.result);
  }
};

/**
 * EVENT LISTENERS
 */

// Loading HOME view on page load
window.addEventListener('load', controlCurrent);

document.addEventListener('click', e => {
  const currentLocation = e.target.closest('.current-location');
  const addLocationBtn = e.target.closest(
    `.${base.elementsString.addLocationBtn}`
  );
  const closeBtn = e.target.closest('.close-button');

  if (currentLocation) {
    console.log('CurrentLocation');
  }

  if (addLocationBtn) {
    base.clearMain();

    searchView.renderSearch();

    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
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
    controlCurrent();
  }
});

/**
 * FOR DEVELOPMENT
 */

// Setting state on window for development purposes
window.state = state;
