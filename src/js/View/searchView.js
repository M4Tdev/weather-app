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
    "Can't find city with provided name";
};

const createResultMarkup = (item, isSaved) => {
  const markup = `
		<div class="result ${isSaved !== -1 ? 'saved' : ''}" data-id="${item.id}">
			${item.name}, ${item.country}
		</div>
	`;
  return markup;
};

export const renderSearchResults = (result, isSaved) => {
  if (result === undefined || result.length === 0) {
    renderError();
    return;
  }

  const HTML = createResultMarkup(result, isSaved);

  document
    .querySelector(`.${elementsString.results}`)
    .insertAdjacentHTML('beforeend', HTML);
};
