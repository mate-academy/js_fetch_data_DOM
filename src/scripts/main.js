/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');
const url = `https://mate-academy.github.io/`
  + `phone-catalogue-static/api/phones.json`;

const phonesWithDetails = [];

fetch(url)
  .then(response => {
    if (!response.ok) {
      return Promise.reject(
        `${response.status} | ${response.statusText}`
      );
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      return Promise.reject('Content-type isn\'t supported');
    }

    return response.json();
  })
  .then(result => {
    const list = document.createElement('ul');

    result.forEach(phone => {
      const li = document.createElement('li');

      phonesWithDetails.push([phone.id, phone.name, phone.snippet]);

      li.innerText = phone.name;
      li.setAttribute('id', `${phone.id}`);
      li.setAttribute('data-snippet', `${phone.snippet}`);
      list.appendChild(li);
    });
    body.appendChild(list);
  })
  .catch(error => {
    const message = document.createElement('div');

    message.innerText = error;
    body.appendChild(message);
  });
