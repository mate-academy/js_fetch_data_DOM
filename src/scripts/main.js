'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const listURL = `${BASE_URL}/phones.json`;
const detailsURL = `${BASE_URL}/phones/`;

const listOfPhones = document.createElement('ul');

document.body.append(listOfPhones);

const getPhones = () => {
  return fetch(listURL)
    .then(response => response.json())
    .then(result => {
      const phonesId = result.map(phone => phone.id);

      getPhonesDetails(detailsURL, phonesId);
    })
    .catch(error => {
      setTimeout(() => (
        new Error(error)
      ), 5000);
    });
};

const getPhonesDetails = (url, arrayOfId) => {
  arrayOfId.forEach(id => {
    fetch(url + id + '.json')
      .then(response => response.json())
      .then(result => {
        const eachPhone = document.createElement('li');

        eachPhone.innerText = result.name;

        listOfPhones.append(eachPhone);
      })
      .catch(error => {
        setTimeout(() => (
          new Error(error)
        ), 5000);
      });
  });
};

getPhones();
