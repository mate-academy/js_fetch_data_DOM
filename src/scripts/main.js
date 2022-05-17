'use strict';

const BaseUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const phoneDetails
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const body = document.body;
const ul = document.createElement('ul');

body.append(ul);

function getPhones() {
  return fetch(BaseUrl)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          throw Error(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
}

function getPhonesDetails(phoneIDs) {
  phoneIDs.forEach(phoneid => {
    fetch(`${phoneDetails}${phoneid}.json`)
      .then(response => {
        if (!response.ok) {
          throw Error(`${response.status} - ${response.status.text}`);
        }

        return response.json();
      })
      .then(phone => {
        const li = document.createElement('li');

        li.textContent = phone.name;
        ul.append(li);
      });
  });
};

getPhones()
  .then(phones => {
    const phoneIDs = phones.map(phone => phone.id);

    getPhonesDetails(phoneIDs);
  });
