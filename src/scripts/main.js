/* eslint-disable no-console */
'use strict';

// write your code here

const LIST_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  // eslint-disable-next-line no-undef
  return fetch(`${LIST_URL}${url}`)
    .then(response => {
      return response.json();
    });
};

function getPhones() {
  const resolver = (resolve, reject) => {
    resolve(request('/phones.json'));

    setTimeout(() => {
      reject();
    }, 5000);
  };

  return new Promise(resolver);
}

getPhones()
  .then(
    result => console.log(result),
    error => console.warn('Error with list - ', error),
  );

function getPhonesDetails(phoneId) {
  const resolver = (resolve, reject) => {
    resolve(request(`/phones/${phoneId}.json`));
    reject();
  };

  return new Promise(resolver);
}

getPhonesDetails('motorola-xoom-with-wi-fi')
  .then(
    result => console.log(result),
    error => console.warn('Error with id - ', error),
  );

let phonesDetails = getPhonesDetails('motorola-xoom-with-wi-fi');

getPhones()
  .then(
    listOfPhonesData => Promise.all(
      listOfPhonesData.map(infoOfPhone => {
        phonesDetails = getPhonesDetails(infoOfPhone.id);

        return phonesDetails
          .then(basicInfoOfPhone =>
            Object.assign(basicInfoOfPhone, infoOfPhone));
      })
    )
      .then(result => console.log(result))
  );
