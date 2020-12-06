/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
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
    resolve(request(`/phones.json`));

    setTimeout(() => {
      reject(new Error(`Server didn't response`));
    }, 5000);
  });
};

const phonesPromise = getPhones();

const getPhonesDetails = (id) => {
  const phoneWithDetailsPromise = new Promise((resolve) => {
    resolve(request(`/phones/${id}.json`));
  });

  return phoneWithDetailsPromise
    .then(details => ({ ...details }));
};

phonesPromise
  .then(phones => {
    Promise.all(phones.map((phone) => ({
      ...getPhonesDetails(phone.id),
      ...phone,
    })))
      .then(result => console.log(result));
  });
