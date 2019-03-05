export const elements = {
  mainContainer: document.querySelector('.main-container'),
};

export const elementsString = {
  current: 'current-location-box',
  results: 'results-section',
  searchForm: 'search-form',
  searchInput: 'search-input',
  searchBtn: 'search-btn',
  addLocationBtn: 'add-other-location-btn',
  otherLocationsList: 'other-locations-list',
  loader: 'lds-ellipsis',
};

export const renderLoader = parent => {
  const loader = `
		<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	`;

  parent.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementsString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

export const clearMain = () => {
  elements.mainContainer.innerHTML = '';
};
