'use strict';

function request(volume) {
  return fetch(`${API_URL}${volume}`)
    .then(response => response.json());
}

function getPhones() {
  return request('/phones.json');
}

function getPhonesDetails(phoneIds) {
  return phoneIds
    .map(id => request(`/phones/${id}.json`));
}

function addItemToList(itemText, list) {
  list.insertAdjacentHTML('beforeend', `
    <li>${itemText}</li>
  `);
}

const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesList = document.createElement('ol');

phonesList.style.cssText = 'margin-left: 50px';

document.body.append(phonesList);

getPhones()
  .then(phones => {
    const phoneIds = phones.map(({ id }) => id);

    getPhonesDetails(phoneIds)
      .map(response => response
        .then(phoneDetails => addItemToList(phoneDetails.name, phonesList)));
  });
