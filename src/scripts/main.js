'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/';

const list = document.createElement('ul');

document.body.append(list);

const getPhones = (url) => {
  return fetch(`${url}phones.json`)
    .then(response => response.json())
    .then(phones => {
      const phonesList = phones.map(phone => phone.id);

      getPhonesDetails(url, phonesList);
    })
    .catch(error => {
      setTimeout(() => {
        throw new Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (url, phonesList) => {
  phonesList.map(phoneId => {
    fetch(`${url}phones/${phoneId}.json`)
      .then(response => response.json())
      .then(result => {
        const phoneName = result.name;

        list.insertAdjacentHTML('beforeend', `
          <li>${phoneName}</li>
        `);
      })
      .catch(error => {
        throw new Error(error);
      });
  });
};

getPhones(BASE_URL);
