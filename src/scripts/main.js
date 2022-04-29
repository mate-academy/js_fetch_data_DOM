'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const listUrl = `${BASE_URL}/phones.json`;
const detailsUrl = `${BASE_URL}/phones`;

const phonesList = document.createElement('ul');

document.body.append(phonesList);

const getPhones = () => {
  return fetch(listUrl)
    .then(response => response.json())
    .then(result => {
      const phoneId = result.map(phone => phone.id);

      getPhonesDetails(phoneId);
    })
    .catch(error => {
      setTimeout(() => (
        new Error(error)
      ), 5000);
    });
};

const getPhonesDetails = (phonesId) => {
  phonesId.forEach(id => {
    fetch(`${detailsUrl}/${id}.json`)
      .then(response => response.json())
      .then(result => {
        const phoneName = document.createElement('li');

        phoneName.innerText = result.name;

        phonesList.append(phoneName);
      })
      .catch(error => Promise.reject(error));
  });
};

getPhones();
