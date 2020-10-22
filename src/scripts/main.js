/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      return response.json();
    });
};

function getPhones() {
  const resolver = (resolve, reject) => {
    resolve(request('.json'));

    setTimeout(() => {
      reject();
    }, 5000);
  };

  return new Promise(resolver);
}

getPhones()
  .then(phones => console.log(phones));

function getPhonesDetails(id) {
  const resolver = (resolve, reject) => {
    resolve(request(`/${id}.json`));

    setTimeout(() => {
      reject();
    }, 5000);
  };

  return new Promise(resolver);
}

let phonesDetails;

getPhones()
  .then(
    allPhonesIds => Promise.all(
      allPhonesIds.map((phoneId) => {
        phonesDetails = getPhonesDetails(phoneId.id);

        return phonesDetails
          .then(
            phonesInfo => Object.assign(phonesInfo, phonesDetails));
      })))
  .then(result => console.log(result));
