/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${baseUrl}${url}`)
    .then(response => {
      return response.json();
    });
};

const getPhones = () => {
  const resolver = (resolve, reject) => {
    resolve(request('/phones.json'));

    setTimeout(() => {
      reject('Timeout');
    }, 5000);
  };

  return new Promise(resolver);
};

const getlist = getPhones();

getlist
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });

getlist
  .then(list =>
    Promise.all(list.map(phone => {
      const phoneWithDetails = new Promise((resolve) => {
        resolve(request(`/phones/${phone.id}.json`));
      });

      return phoneWithDetails
        .then(detail => Object.assign(phone, detail));
    })))
  .then(res => console.log(res));
