'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const DETAIL_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/';
const listOfPhones = document.createElement('ul');

const getPhones = () => {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          alert(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (phone) => {
  return fetch(`${DETAIL_URL}${phone}.json`)
    .then(response => {
      if (!response.ok) {
        return `${response.status} - ${response.statusText}`;
      }

      return response.json();
    });
};

getPhones()
  .then(phones => {
    const listOfPhonesDetails = phones.map(phone => getPhonesDetails(phone.id));

    Promise.all(listOfPhonesDetails)
      .then(phoneDetails => {
        phoneDetails.forEach(phone => {
          const phoneDOM = document.createElement('li');

          phoneDOM.textContent = phone.name;
          listOfPhones.append(phoneDOM);
        });
      });
  })
  .catch(error => alert(error));

document.body.append(listOfPhones);
