'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }, 5000);
      }

      return response.json();
    })
    .then(result => result);
};

const getPhones = () => request('/phones.json');
const getPhonesDetails = (phoneId) => request(`/phones/${phoneId}.json`);

const phonesWithDetails = () => {
  return getPhones()
    .then(result => Promise.all(
      result.map(phoneId => getPhonesDetails(phoneId.id)
        .then(details => Object.assign(details, phoneId))
      )
    ));
};

getPhones()
  // eslint-disable-next-line no-console
  .then(result => console.log('Succes:', result))
  // eslint-disable-next-line no-console
  .catch(error => console.warn('Error:', error));

getPhonesDetails('dell-streak-7')
  // eslint-disable-next-line no-console
  .then(result => console.log(`"${result.id}" details:`, result))
  // eslint-disable-next-line no-console
  .catch(error => console.warn('Error:', error));

phonesWithDetails()
  // eslint-disable-next-line no-console
  .then(result => console.log('Phones with details:', result))
  // eslint-disable-next-line no-console
  .catch(error => console.warn('Error:', error));
