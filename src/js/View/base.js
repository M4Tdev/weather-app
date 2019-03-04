export const elements = {
  mainContainer: document.querySelector('.main-container'),
};

export const elementsString = {
  current: 'current-location-box',
};

export const renderLoader = parent => {
  const loader = `
		<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	`;

  parent.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.lds-ellipsis');
  if (loader) loader.parentElement.removeChild(loader);
};
