'use strict';

const url = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const list = document.createElement('ol');

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`));
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(
          new Error('Content type is not supported')
        );
      }

      return response.json();
    });
}

const phones = getPhones();

phones
  .then(function(arr) {
    for (const phone of arr) {
      list.insertAdjacentHTML('beforeend', `
      <li>Name: ${phone.name}, id: ${phone.id}</li>
      `);
    }

    document.body.append(list);
  })
  .catch(text => {
    const error = document.createElement('p');

    error.textContent = text;
    document.body.append(error);
  });
