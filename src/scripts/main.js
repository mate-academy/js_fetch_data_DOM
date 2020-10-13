'use strict';

/* eslint-disable no-console */

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`) /* eslint-disable-line */
    .then(response => {
      return response.json();
    });
};

function getPhones() {
  const resolver = (resolve, reject) => {
    resolve(request('/phones.json'));

    setTimeout(() => {
      reject('Error');
    }, 5000);
  };

  return new Promise(resolver);
}

const phonesList = getPhones();

phonesList
  .then(
    result => console.log(result),
    error => console.warn(error)
  );

function getPhonesDetails(IDs) {
  const resolver = (resolve) => {
    resolve(request(`/phones/${IDs}.json`));
  };

  return new Promise(resolver);
}

let phoneDetails = getPhonesDetails('motorola-xoom');

phoneDetails
  .then(
    result => console.log(`${result.name}:`, result),
    error => console.warn(error)
  );

const phonesWithDetails = getPhones();

phonesWithDetails
  .then(
    resultList => Promise.all(
      resultList.map(detailedInfo => {
        phoneDetails = getPhonesDetails(detailedInfo.id);

        return phoneDetails
          .then(baseInfo => Object.assign(baseInfo, detailedInfo));
      })
    )
      .then(result => console.log(result))
  );
