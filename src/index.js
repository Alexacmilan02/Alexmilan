'use strict'

import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')


const onInputChange = event => {
  
    const searchCountry = event.target.value.trim();

    fetchCountries(searchCountry)
    .then(data => {

        if(searchCountry === '') {
          countryInfoEl.innerHTML = ''
          countryListEl.innerHTML = ''
        }
        else if(data.length >= 2 && data.length <= 10) {
          countryInfoEl.innerHTML = ''

        const addItemElement = data
            .map(el => ` <li class="country-item">
                <img
                class="country-image"
                src="${el.flags.svg}"
                    />
                <p class="country-text">${el.name.common}</p>
                </li>`)
        
         countryListEl.innerHTML = addItemElement.join('')
        }
        else if (data.length === 1) {
          countryListEl.innerHTML = ''

            const elem = data[0]
            

            const elementLanguages = Object.values(elem.languages)
            console.log(elementLanguages);

           countryInfoEl.innerHTML = `<div class="country-info-box">
            <img class="country-info-image" src="${elem.flags.svg}" alt="">
            <p class="country-info-name">${elem.name.common}</p>
          </div>
          <ul class="country-info-list">
            <li class="country-info-item">
              <p class="country-info-text"><span class="main-text">Capital:</span>${elem.capital}</p>
            </li>
            <li class="country-info-item">
              <p class="country-info-text"><span class="main-text">Population:</span>${elem.population}</p>
            </li>
            <li class="country-info-item">
              <p class="country-info-text"><span class="main-text">Languages:</span>${elementLanguages}</p>
            </li>
          </ul>`
        } 
        else if (data.length > 10) {
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
    })
    .catch(error => {
      return Notiflix.Notify.failure("Oops, there is no country with that name");
      });
    
}


inputEl.addEventListener('input', debounce(onInputChange, 300))
