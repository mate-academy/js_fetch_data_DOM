/* eslint-disable max-len */
'use strict';

// write your code here

const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const details = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json';

function getPhones(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(result => resolve(result));

    setTimeout(() => {
      reject(new Error('Error: data cannot be loaded'));
    }, 5000);
  });
};

function getPhonesDetails(ids) {
  const phones = ids.map(id => fetch(`${details}${id}.json`));

  return Promise.all(phones);
}

const list = document.createElement('ul');
const body = document.querySelector('body');

getPhones(listUrl)
  .then(phones => {
    phones.forEach(item => {
      const listItem = document.createElement('li');

      listItem.textContent = item.name;
      list.append(listItem);

      body.append(list);
    });
  })
  .then(result => getPhonesDetails(result));
