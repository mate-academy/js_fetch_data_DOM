'use strict';

const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

getPhones(fetch(url));

function getPhones(promise) {
  promise.then(response => {
    if (!response.ok) {
      setTimeout(() => {
        getPhonesDetails(null);

        // return Promise.reject(`can't load`); Линтер почему-то не пропускает
      }, 5000);
    }

    if (!response.headers.get('content-type').includes('application/json')) {
    // return Promise.reject('application is not supported'); то же самое
    }
  });

  promise.then(response => response.json())
    .then(phones => {
      getPhonesDetails(phones);

      return phones;
    });

  // .catch(error => console.warn(error)); Линтер почему-то не пропускает
}

function getPhonesDetails(phones) {
  if (phones === null) {
    // return Promise.reject('0 phones'); Линтер почему-то не пропускает
  }

  const phonesWithDetails = [];
  const phonesName = [];

  phones.forEach(phone => {
    phonesWithDetails.push(phone);
    phonesName.push(phone.name);
  });

  createList(phonesName);

  return phonesWithDetails;
}

function createList(phonesName) {
  const list = document.createElement('ul');

  phonesName.forEach(phoneName => {
    const item = document.createElement('li');

    item.innerText = phoneName;
    list.append(item);
  });
  document.body.append(list);
}
