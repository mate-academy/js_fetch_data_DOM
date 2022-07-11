'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const ENDPOINTS = {
  phones: '/phones.json',
  phoneById: (id) => `/phones/${id}.json`,
};
const body = document.querySelector('body');
const list = document.createElement('ul');

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        ), 5000);
      }

      return response.json();
    });
};

const getPhoneDetails = (idArr) => {
  return Promise.all(idArr.map(id => request(ENDPOINTS.phoneById(id))));
};

const getPhones = () => {
  request(ENDPOINTS.phones)
    .then((data) => {
      data.forEach(phone => {
        list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
      });

      const ids = data.map(phone => phone.id);

      getPhoneDetails(ids)
        .then(response => {
          const phonesWithDetails = data.map((phone, i) => {
            return Object.assign(phone, response[i]);
          });

          // eslint-disable-next-line
        console.log(phonesWithDetails);
        });

      body.append(list);
    });
};

getPhones();
