'use strict';

// eslint-disable-next-line max-len
const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line max-len
const detailsUrl = '/:https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json.';

const getPhones = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          // eslint-disable-next-line max-len
          return Promise.reject(new Error('It was an accident, next time will be better ...or not'));
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (arr) => {
  return arr.map(phone =>
    fetch(`${detailsUrl}${phone.id}.json`));
};

getPhones()
  .then(phones => getPhonesDetails(phones))
  .catch(error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  });
