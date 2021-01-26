'use strict';

const BASE_URL = `https://mate-academy.github.io/phone-catalogue-static/api`;

const phonesWithDetails = [];

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

function getPhones(url) {
  return new Promise((resolve, reject) => {
    request(url)
      .then(result => resolve(result));

    setTimeout(() => {
      reject(Error);
    }, 5000);
  });
};

function generateList(array) {
  const ul = document.createElement('ul');

  document.body.append(ul);

  for (const item of array) {
    const li = document.createElement('li');

    li.innerText = item.name;
    ul.append(li);
  }

  return array;
}

function generateID(array) {
  for (const item of array) {
    getPhones(`/phones/${item.id}.json`)
      .then(result => phonesWithDetails.push(result));
  }
}

getPhones('/phones.json')
  .then(result => generateList(result))
  .then(phones => generateID(phones));
