'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const endpoint = '.json';

const body = document.querySelector('body');

const request = (url) => {
  return fetch(`${baseUrl}${url}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch((error) => {
      setTimeout(() => error, 5000);
    });
};

function getPhones() {
  return request(endpoint);
};

function getPhonesDetails() {
  const ol = document.createElement('ol');

  body.append(ol);

  return phonesModels.then(phones => phones.map(phone => {
    return request(`/${phone.id}${endpoint}`)
      .then(complete => ol.insertAdjacentHTML(
        `beforeend`, `
          <li>
            ${complete.name}
          </li>
        `))
      .catch(error => error);
  }));
};

const phonesModels = getPhones();

getPhonesDetails();
