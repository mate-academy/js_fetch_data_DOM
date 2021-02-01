'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesWithDetails = [];

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          Promise.reject(new Error('Wooops! Something went wrong!'));
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = (url) => request(url);

const getPhonesDetails = (arr) => {
  for (const phone of arr) {
    getPhones(`/phones/${phone.id}.json`)
      .then(result => phonesWithDetails.push(result));
  }

  return arr;
};

const createList = (arr) => {
  const ul = document.createElement('ul');

  document.body.append(ul);

  for (const el of arr) {
    const li = document.createElement('li');

    li.textContent = el.name;
    ul.append(li);
  }
};

getPhones('/phones.json')
  .then(result => getPhonesDetails(result))
  .then(detail => createList(detail));
