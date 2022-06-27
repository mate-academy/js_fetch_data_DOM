'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const forDetailUrl = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/';

function getPhones(url) {
  return fetch(`${url}`)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)), 5000);
      }

      return response.json();
    })
    .catch(error => window.console.warn(error));
}

function getPhonesDetails(IDs) {
  return Promise.all(IDs.map(id => getPhones(`${forDetailUrl}${id}.json`)));
}

getPhones(BASE_URL)
  .then(phones => {
    window.console.log('Phones: ', phones);

    const list = document.createElement('ul');

    list.innerHTML = `
      ${phones.map(phone => `
      <li>
        ${phone.id}
      </li>
      `).join('')}
    `;
    document.body.append(list);
  });

getPhones(BASE_URL)
  .then(phones => {
    const IDs = phones.map(phone => phone.id);

    return IDs;
  })
  .then(IDs => getPhonesDetails(IDs))
  .then(details => window.console.log('Details: ', details));
