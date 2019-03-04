import Current from './Model/Current';
import * as homeView from './View/homeView';
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

window.state = state;

window.addEventListener('load', controlCurrent);
