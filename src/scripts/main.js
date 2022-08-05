'use strict';

// eslint-disable-next-line
const listURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const detailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const request = (url) => {
  return fetch(url)
    .then(response => {
      return Promise.race([
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error(response.status));
          }, 5000);
        }),
        new Promise(resolve => {
          if (response.ok) {
            resolve(response.json());
          }
        }),
      ]);
    });
};

const getPhones = () => {
  return request(listURL);
};

const getPhonesDetails = (phones) => {
  return Promise.all(phones.map(phone => {
    return request(`${detailsURL}${phone.id}.json`);
  }));
};

const showPhoneNames = (details) => {
  const list = document.createElement('ul');

  list.innerHTML = details.map(phone => `<li>${phone.name}</li>`).join('');
  document.body.append(list);
};

getPhones()
  .then(getPhonesDetails)
  .then(showPhoneNames)
  .catch(alert);
