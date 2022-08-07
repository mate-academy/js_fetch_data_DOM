'use strict';

const listUrl = ' https://mate-academy.github.io/phone-catalogue-static/api';

const listul = document.createElement('ul');
const body = document.querySelector('body');

body.append(listul);

const request = (url) => {
  return fetch(`${listUrl}${url}`)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          return `${response.status} - ${response.statusText}`;
        }
      }, 5000);

      return response.json();
    });
};

const getPhones = () => {
  request('/phones.json')
    .then(data => {
      const phoneId = data.map(phone => phone.id);

      getPhonesDetails(phoneId);
    });
};

const getPhonesDetails = (getPhone) => {
  getPhone.forEach(phoneId => request(`/phones/${phoneId}.json`)
    .then(el => listul
      .insertAdjacentHTML('afterbegin',
        `
      <li>${el.name}</li>
        `
      )));
};

getPhones();
