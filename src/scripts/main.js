/* eslint-disable max-len */
'use strict';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Phones didnt get, timed out'));
    }, 5000);

    fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch('something went wrong');
  });
};

const getPhonesDetails = phonesIds => {
  return new Promise((resolve, reject) => {
    const phonesDetails = [];

    phonesIds.forEach((phoneId, i, array) => {
      fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${phoneId}.json`)
        .then(response => response.json())
        .then(data => {
          phonesDetails.push(data);

          if (array.length === phonesDetails.length) {
            resolve(phonesDetails);
          }
        })
        .catch((error) => reject(new Error(`ERROR: ${error}`)));
    });
  });
};

const phonesArrivingListener = getPhones();

phonesArrivingListener
  .then(data => getPhonesDetails(data.map(phone => phone.id)))
  .then(details => details.forEach(detail => {
    document.querySelector('#list')
      .insertAdjacentHTML('beforeend', `<li>${JSON.stringify(detail)}</li>`);
  }))
  .catch(error => document.querySelector('#list')
    .insertAdjacentHTML('beforeend', `<li>${error}</li>`));
