'use strict';

/* eslint-disable no-console */
const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api';

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

const phoneIds = () => getPhones()
  .then(result => result.map(phone => phone.id))
  .catch(error => console.log(error));

const getPhoneDetails = (id) => {
  return new Promise(resolve => {
    resolve(request(`/phones/${id}.json`));
  });
};

const getPhonesDetails = (ids) => {
  const arrayIds = ids.map(id => getPhoneDetails(id));

  return Promise.all(arrayIds);
};

async function printArray() {
  const ids = await phoneIds();
  const phonesWithDetails = await getPhonesDetails(ids);

  console.log(phonesWithDetails);
};

getPhones().then(result => console.log(result));
phoneIds().then(result => console.log(result));
getPhoneDetails('dell-venue').then(result => console.log(result));
printArray();
