'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const phonesListElement = document.createElement('ul');

document.body.append(phonesListElement);

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/phones.json`)
      .then(response => response.json())
      .then(data => resolve(data));

    setTimeout(() => reject(new Error()), 5000);
  });
}

function getPhonesDetails(phonesIds) {
  const phones = phonesIds.map(id => {
    return fetch(`${BASE_URL}/phones/${id}.json`);
  });

  return Promise.all(phones);
}

getPhones()
  .then(phones => {
    phones.forEach(phone => {
      const phonesItemElement = document.createElement('li');

      phonesItemElement.textContent = phone.name;
      phonesListElement.append(phonesItemElement);
    });
  })
  .then(result => getPhonesDetails(result));
