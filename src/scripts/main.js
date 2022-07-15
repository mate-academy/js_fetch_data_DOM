'use strict';

const BASE_URL = `https://mate-academy.github.io/phone-catalogue-static/api`;
const ENDPOINTS = {
  pnones: '/phones.json',
  phonesId: (Id) => `/phones/${Id}.json`,
};

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .catch(error => setTimeout(() => Promise.reject(error), 5000));
};

const getPhones = () => request(ENDPOINTS.pnones);
const getPhonesDetails = (arrId) => {
  return Promise.all(arrId.map(id => request(ENDPOINTS.phonesId(id))));
};

const ul = document.createElement('ul');

getPhones()
  .then(data => {
    data.forEach(phone => {
      ul.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
    });

    const ids = data.map(phone => phone.id);

    getPhonesDetails(ids)
      .then(response => {
        const phonesWithDetails = data.map((phone, index) => {
          return Object.assign(phone, response[index]);
        });

        console.log(phonesWithDetails); // eslint-disable-line
      })
      .catch(error => setTimeout(() => Promise.reject(error), 5000));
  });

document.querySelector('body').append(ul);
