import { elements, elementsString } from './base';

export const renderSearch = () => {
  const markup = `
		<div class="search-nav">
			<img src="images/search.svg" alt="Search icon" class="search-icon">
			<button class="close-button">
				<img src="images/close.svg" alt="Close button" class="close-btn">
			</button>
		</div>
		<form class="search-form">
			<input type="text" class="search-input" placeholder="Search city or country..." />
			<button type="submit" class="search-btn">
				<img src="images/search.svg" alt="Search icon" class="btn-icon">
			</button>
		</form>

		<h2 class="results-header">Results</h2>
		<div class="results-section">


		</div>
	`;

  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};

export const getInput = () =>
  document.querySelector(`.${elementsString.searchInput}`).value;

export const clearResults = () => {
  document.querySelector(`.${elementsString.results}`).innerHTML = '';
};

export const renderError = () => {
  document.querySelector(`.${elementsString.results}`).innerHTML =
    "Can't find city with this name";
};

const createResultMarkup = item => {
  const markup = `
		<div class="result" data-id="${item.id}">
			${item.name}, ${item.country}
		</div>
	`;
  return markup;
};

export const renderSearchResults = results => {
  if (results === undefined || results.length === 0) {
    renderError();
    return;
  }

  const HTML = results.reduce(
    (total, next) => total + createResultMarkup(next),
    ''
  );

  document
    .querySelector(`.${elementsString.results}`)
    .insertAdjacentHTML('afterbegin', HTML);
};
