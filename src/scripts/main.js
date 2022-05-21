'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/';
const phoneListUrl = `${BASE_URL}/phones.json`;
const detailsUrl = `${BASE_URL}/phones/:phoneId.json`;
const body = document.body;
const ul = document.createElement('ul');

body.append(ul);

function getPhone(url) {
  return fetch(url)
    .then(response => response.json())
    .then(phones => {
      const phoneNames = phones.map(phone => phone.name);

      for (const item of phoneNames) {
        ul.insertAdjacentHTML('beforeend', `<li>${item}</li>`);
      }
    })
    .then(phones => {
      const phonesId = phones.map(phone => phone.id);

      getPhonesDetails(detailsUrl, phonesId);
    })
    .catch(error =>
      setTimeout(() => new Error(error)), 5000);
};

getPhone(phoneListUrl);

function getPhonesDetails(url, ids) {
  ids.forEach(id => {
    return fetch(`${url}${id}.json`)
      .then(response => response.json());
  });
};
