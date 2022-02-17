// import './css/styles.css';
import './sass/main.scss';
import debounce from 'lodash.debounce';
import { fetchCountryByName } from './js/fetchCountries';
import getrefs from './js/refs';
import countryCard from './country-card.hbs';
import countrysList from './country.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const refs = getrefs();

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));


function searchCountry(e) {
  let inputText = refs.searchBox.value.trim();
  if (!inputText) {
    return;
  }
  fetchCountryByName(inputText).then(renderCountry).catch(errorFetch);
}

function renderCountry(response) {
  clearHtml();
  if (!response.length) {
    errorFetch();
  }
  if (response.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (response.length > 1 && response.length <= 10) {
    // console.log('norm');
    renderCountryList(response);
  } else if (response.length === 1) {
    renderCountryCard(response);
  }
}



function clearHtml() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryCard(inputText) {
  const marcup = countryCard(inputText);
  refs.countryInfo.insertAdjacentHTML('beforeend', marcup);
}

function renderCountryList(inputText) {
  console.log(inputText);
  const marcup = countrysList(inputText);
  refs.countryList.insertAdjacentHTML('beforeend', marcup);
}

function errorFetch() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}