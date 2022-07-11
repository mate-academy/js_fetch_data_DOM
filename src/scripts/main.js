'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const ENDPOINTS = {
  phones: '/phones.json',
  phoneById: id => `/phones/${id}.json`,
};

function request(url) {
  return fetch(url)
    .then(response => Promise.resolve(response.json()));
}

function getPhones() {
  return request(`${BASE_URL}${ENDPOINTS.phones}`);
}

function getIds(phones) {
  const result = [];

  for (const phone of phones) {
    result.push(phone.id);
  }

  return result;
}

function getPhonesDetails(ids) {
  return Promise.all(ids.map(id => {
    return request(`${BASE_URL}${ENDPOINTS.phoneById(id)}`);
  }));
}

function showNames(phones) {
  const list = document.createElement('ul');

  phones.forEach(phone => {
    list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
  });

  document.querySelector('body').prepend(list);
}

getPhones()
  .then(phones => {
    showNames(phones);

    getPhonesDetails(getIds(phones))
      .then(response => {
      // const phonesWithDetails = phones.reduce((accumulator, current, i) => {
        //   return [...accumulator, Object.assign(current, response[i])];
        // }, []);
      });
  });
