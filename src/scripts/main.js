'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const list = document.createElement('ul');
const body = document.querySelector('body');

body.append(list);

function requestData(endPoint) {
  return fetch(`${BASE_URL}${endPoint}.json`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return new Error('Error');
        }, 5000);
      };

      return response.json();
    });
};

const getPhones = () => {
  return requestData('/phones');
};

const getPhonesDetails = (id) => {
  return requestData(`/phones/${id}`);
};

getPhones()
  .then(data => {
    return Promise.all(data.map(el => getPhonesDetails(el.id)));
  })
  .then(phones => {
    phones.forEach(phone => {
      list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
    });
  });
