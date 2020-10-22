/* eslint-disable no-console */
'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  // eslint-disable-next-line no-undef
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      return response.json();
    });
};

function getPhones() {
  const resolver = (resolve, reject) => {
    resolve(request(`/phones.json`));

    setTimeout(() => {
      reject('Error');
    }, 5000);
  };

  return new Promise(resolver);
};

getPhones()
  .then(
    result => console.log(result),
    error => console.log(error)
  );

function getPhonesDetails(ids) {
  const resolver = (resolve, reject) => {
    resolve(request(`/phones/${ids}.json`));

    setTimeout(() => {
      reject('Error');
    }, 5000);
  };

  return new Promise(resolver);
};

getPhonesDetails('samsung-transform')
  .then(
    result => console.log(`${result.id}`, result),
    error => console.log(error)
  );

const phoneWithDetails = getPhones();

phoneWithDetails
  .then(
    resultList => Promise.all(
      resultList.map(phone => {
        return getPhonesDetails(phone.id)
          .then(details => Object.assign(phone, details));
      })
    )
  )
  .then(result => console.log(result));
