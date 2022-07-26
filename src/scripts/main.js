'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const list = document.createElement('ul');

document.body.append(list);

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = () => request('/phones.json');

function getPhonesDetails(arr) {
  for (const IDs of arr) {
    const listItem = document.createElement('li');

    listItem.innerText = IDs.name;

    list.append(listItem);
  }
}

getPhones()
  .then(result => {
    getPhonesDetails(result);
  })
  .catch(error => {
    window.console.warn(error);
  });
