import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import { countryCard } from './countryCard.js';
import { countriesList } from './countryList.js';
import _debounce from 'lodash.debounce';
import getRefs from './get-refs.js';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputEl.addEventListener(
  'input',
  _debounce(onInputCounry, DEBOUNCE_DELAY)
);

function onInputCounry(e) {
  e.preventDefault();
  const form = e.target;
  const searchEl = form.value.trim();
  if (!searchEl) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchEl).then(onRenderCountry).catch(onError);
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onRenderCountry(countries) {
  console.log(countries.length);

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length <= 10) {
    const markupList = countriesList(countries);

    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = markupList;
  }
  if (countries.length === 1) {
    const listInfo = countryCard(countries);

    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = listInfo;
  }
}
