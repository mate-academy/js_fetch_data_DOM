'use strict';

/* eslint-disable no-console */
const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const request = (url) => {
  // eslint-disable-next-line no-undef
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    resolve(request('/phones.json'));

    setTimeout(() => {
      reject(new Error('Timeout'));
    }, 5000);
  });
};

getPhones()
  .then(result => console.log(result))
  .catch(error => console.log(error));
