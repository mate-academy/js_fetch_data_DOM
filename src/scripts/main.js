'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const arrId = [];

function getPhones(address) {
  return fetch(address)
    .then(response => response.json())
    .then(phones => new Promise((resolve, reject) => {
      resolve(getPhonesIds(arrId, phones), showPhonesName(phones));
      getPhonesDetalis(arrId);

      setTimeout(() => {
        reject(phones);
      }, 5000);
    }))
    .catch();
};

function getPhonesIds(arr, phones) {
  for (const phoneId of phones) {
    arr.push(phoneId.id);
  }
}

function showPhonesName(phones) {
  const body = document.querySelector('body');
  const phoneList = document.createElement('ul');

  body.prepend(phoneList);

  for (const phoneName of phones) {
    phoneList.insertAdjacentHTML('beforeend', `<li>${phoneName.name}</li>`);
  }
}

function getPhonesDetalis(arr) {
  for (let i = 0; i < arr.length; i++) {
    const url = `${BASE_URL}/phones/${arr[i]}.json`;

    fetch(url)
      .then(detale => detale.json())
      .then(result => result)
      .catch(err => err);
  }
}
getPhones(`${BASE_URL}/phones.json`);
