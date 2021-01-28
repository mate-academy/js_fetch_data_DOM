'use strict';

const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesWithDetails = [];

const request = (url) => {
  return fetch(`${listUrl}${url}`)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line prefer-promise-reject-errors
        setTimeout(() => Promise.reject('Something is wrong'), 5000);
      }

      return response.json();
    });
};

const getPhones = (url) => request(url);

function getPhonesDetails(arr) {
  for (const el of arr) {
    getPhones(`/phones/${el.id}.json`)
      .then(result => phonesWithDetails.push(result));
  }

  return arr;
};

function createList(arr) {
  const list = document.createElement('ul');

  for (const el of arr) {
    const li = document.createElement('li');

    li.textContent = el.name;
    list.append(li);
  }
  document.querySelector('body').append(list);

  return arr;
}

getPhones('/phones.json')
  .then(result => getPhonesDetails(result))
  .then(result => createList(result))
  .catch();
