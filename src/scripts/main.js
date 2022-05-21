'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const ul = document.createElement('ul');
const body = document.querySelector('body');

const phonesWithDetails = [];

body.append(ul);

const request = (url) => {
  return fetch(`${baseUrl}${url}`)
    .then(response => response.json());
};

const getPhones = () => {
  request(`/phones.json`)
    .then(phones =>
      phones.map(phone => getPhonesDetails(phone)))
    .catch(error =>
      setTimeout(() => {
        new Error(error);
      }, 5000));
};

const getPhonesDetails = (phone) => {
  request(`/phones/${phone.id}.json`)
    .then(phoneDetail => {
      ul.insertAdjacentHTML('beforeend', `<li>${phoneDetail.name}</li>`);

      phonesWithDetails.push({
        ...phone, detail: phoneDetail,
      });
    })
    .catch(error => new Error(error));
};

getPhones();
