'use strict';
/* eslint-disable */
const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/';
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
/* eslint-enable */
const getPhones = (url) => {
  return fetch(url + 'phones.json')
    .then(response => response.json())
    .then(data => {
      const listOfPhonesId = data.map(phone => phone.id);

      getPhonesDetails(detailsUrl, listOfPhonesId);
    })
    .catch(() => {
      setTimeout(() => (new Error('Some problems with server')), 5000);
    });
};

const getPhonesDetails = (url, listOfId) => {
  const listOfPhonesName = document.createElement('ul');

  listOfId.forEach(id => {
    return fetch(url + id + '.json')
      .then(response => response.json())
      .then(data => {
        const phoneItemNames = document.createElement('li');

        phoneItemNames.textContent = `${data.name}`;
        listOfPhonesName.append(phoneItemNames);
      })
      .catch(() => {
        setTimeout(() => (new Error('Some problems with server')), 5000);
      });
  });

  const body = document.querySelector('body');

  body.append(listOfPhonesName);
};

getPhones(listUrl);
