'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const DETAILS = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/:phoneId.json';

const body = document.querySelector('body');
const listOfPhone = document.createElement('ul');

body.append(listOfPhone);

function getPhones() {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok
        || !response.headers.get('content-type').includes('application/json')) {
        return new Error(`Something went wrong`);
      }

      return response.json();
    });
}

function getPhonesDetails(listOfIds) {
  const phonesWithDetails = [];

  listOfIds.forEach(phone => {
    const object = {};

    fetch(DETAILS.replace(':phoneId', phone.id))
      .then(response => response.json())
      .then(details => {
        object[phone.id] = details;
        phonesWithDetails.push(object);

        const li = document.createElement('li');

        li.innerText = details.name;
        listOfPhone.append(li);
      })
      .catch(error => new Error(error));
  });
}

getPhones()
  .then(list => {
    getPhonesDetails(list);
  })
  .catch(error => setTimeout(() => new Error(error), 5000));
