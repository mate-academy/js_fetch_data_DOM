'use strict';

const PHONES_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const body = document.querySelector('body');

function getPhones() {
  const abortController = new AbortController();

  setTimeout(() => abortController.abort(), 5000);

  return fetch(PHONES_URL, { signal: abortController.signal })
    .then(response => response.json())
    .then(response => response.map(phone => phone.id))
    .catch(() => Promise.reject(new Error('Request timeout')));
}

function getPhonesDetails(idArray) {
  return Promise.all(idArray.map(id => {
    return fetch(`${DETAILS_URL}${id}.json`)
      .then(response => response.json())
      .catch(() => Promise.reject(new Error(`Can't get phone details`)));
  }));
}

function displayPhones(phonesArray) {
  body.innerHTML = `
    <ul>
        ${phonesArray.map(phone => `<li>${phone.name}</li>`).join('')}
    </ul>
  `;
}

function handleError(error) {
  body.innerHTML = `
    <h1 style="color: #f00">${error}<h1>
  `;
}

getPhones()
  .then(response => getPhonesDetails(response))
  .then(response => displayPhones(response))
  .catch(error => handleError(error));
