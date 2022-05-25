'use strict';

// write your code here
const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const request = (url) => {
  return fetch(url)
    .then(response => {
      return response.ok
        ? response.json()
        : setTimeout(() => {
          throw new Error(`${response.status} - ${response.statusText}`);
        }, 5000);
    });
};

const getPhones = () => request(`${BASE_URL}.json`);
const getPhonesDetails = (id) => request(`${BASE_URL}/${id}.json`);

const body = document.body;
const list = document.createElement('ul');

body.insertAdjacentElement('beforeend', list);

const phonesWithDetails = () => {
  getPhones()
    .then(phones => {
      phones.map(phone => {
        getPhonesDetails(phone.id)
          .then(details => {
            list.insertAdjacentHTML(
              'afterbegin',

              `<li>
              Name: ${details.name}
              </li>`,
            );
          });
      });
    });
};

phonesWithDetails();
