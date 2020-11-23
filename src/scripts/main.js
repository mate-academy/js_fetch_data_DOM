'use strict';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          Promise.reject(`${response.status}`)
            // eslint-disable-next-line no-console
            .catch(error => console.warn('Error:', error));
        }, 5000);
      }

      return response.json();
    });
};
const getPhones = () => request('.json');
const getPhonesDetails = (id) => request(`/${id}.json`);
const phoneWithDetails = () => {
  return getPhones()
    .then(result => Promise.all(
      result.map(phone => getPhonesDetails(phone.id)
        .then(info => Object.assign(info, phone))
      )
    ));
};

// eslint-disable-next-line no-console
getPhones().then(result => console.log(result));
// eslint-disable-next-line no-console
getPhonesDetails('sanyo-zio').then(result => console.log(result));
// eslint-disable-next-line no-console
phoneWithDetails().then(result => console.log(result));
