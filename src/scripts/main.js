'use strict';

const BASE_URL = ' https://mate-academy.github.io/phone-catalogue-static/api';

const body = document.querySelector('body');
const phonesList = document.createElement('ul');

body.appendChild(phonesList);

const request = (url, timeout = 0) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          return `${response.status} - ${response.statusText}`;
        }
      }, timeout);

      return response.json();
    });
};

const getPhones = () => {
  request('/phones.json', 5000)
    .then(phones => {
      const allPhonesId = phones.map(phone => phone.id);

      getPhonesDetails(allPhonesId);
      phonesWithDetails(allPhonesId);
    });
};

const getPhonesDetails = (idSet) => {
  idSet.forEach(phoneId => request(`/phones/${phoneId}.json`)
    .then(item => phonesList.insertAdjacentHTML('afterbegin', `
      <li>${item.name}</li>
    `))
  );
};

const phonesWithDetails = (idSet) => {
  const phonesWithDetailsList = [];

  idSet.forEach(phoneId => request(`/phones/${phoneId}.json`)
    .then(item => phonesWithDetailsList.push(item))
  );

  return phonesWithDetailsList;
};

getPhones();
