'use strict';

// write your code here

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const logo = document.querySelector('.logo');
const list = document.createElement('ul');

const getPhones = () => {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw setTimeout(() => {
          return Promise.reject(new Error(
            `${response.status} - ${response.statusText}`
          ));
        }, 5000);
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        throw setTimeout(() => {
          return Promise.reject(new Error(
            `Content-type is not supported - ${response.status}`
          ));
        });
      }

      return response.json();
    })
    .then(result => result);
};

const getPhonesDetails = () => {
  const phonesId = [];

  getPhones()
    .then(phones => {
      phones.forEach(phone => phonesId.push(phone.id));

      const phonesDetails = phonesId.map(itemId =>
        fetch(`${DETAILS_URL}${itemId}.json`)
          .then(response => response.json()));

      Promise.all(phonesDetails)
        .then(details => details.forEach(phone => addPhoneToList(phone.name)));
    })
    .catch(error => new Error(error));
};

getPhonesDetails();

function addPhoneToList(phonesName) {
  list.insertAdjacentHTML('beforeend', `<li>${phonesName}</li>`);
}

logo.after(list);
