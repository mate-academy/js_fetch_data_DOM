'use strict';

// write your code here
const BASE_URL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const url = `${BASE_URL}.json`;
const body = document.querySelector('body');
const list = document.createElement('ul');

body.append(list);

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          // eslint-disable-next-line no-console
          console.warn(`Error: ${response.status}`);
        }, 5000);
      }

      return response.json();
    });
};

function getPhonesDetails(ids) {
  return fetch(`${BASE_URL}/${ids}.json`)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line no-console
        return console.warn(`Error: ${response.status}`);
      }

      return response.json();
    });
}

const detailArray = [];
const phonesWithDetails = [];

getPhones()
  .then(phones => {
    const phonesIds = phones.map(item => getPhonesDetails(item.id));

    Promise.all(phonesIds)
      .then(details => {
        details.map(el => {
          detailArray.push(el);

          const text = `<li>${el.name}</li>`;

          list.insertAdjacentHTML('beforeend', text);

          phones.map(item => {
            if (item.id === el.id) {
              item.detail = el;
              phonesWithDetails.push(item);
            }
          });
        });
        // eslint-disable-next-line no-console
        console.log(detailArray);
        // eslint-disable-next-line no-console
        console.log(phonesWithDetails);
      });
  });
