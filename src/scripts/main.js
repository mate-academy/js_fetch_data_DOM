'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesEndpoint = '/phones.json';
const detailsEndpoint = id => `/phones/${id}.json`;
const timeToWait = 5000;

const request = url =>
  fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      } else if (!response.headers.get('content-type')
        .includes('application/json')) {
        throw new Error('Content type is not supported');
      }

      return response.json();
    });

const getPhones = () => {
  Promise.race([
    request(phonesEndpoint),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeToWait)
    )])
    .then(phones => {
      const elementUl = document.createElement('ul');

      elementUl.insertAdjacentHTML('afterbegin',
        `${phones.map(phone => `<li>${phone.name}</li>`).join('')}`);
      document.body.append(elementUl);

      return Promise.all(
        phones.map(_phones => request(detailsEndpoint(_phones.id))))
        .then(details => {
          const phonesWithDetails
          = phones.map((phone, index) => ({
            ...phone,
            ...details[index],
          }));

          // eslint-disable-next-line
          console.log(phonesWithDetails);
        });
    });
};

getPhones();
