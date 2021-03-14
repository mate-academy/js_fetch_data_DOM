'use strict';
/* eslint-disable no-console */

const BASE_URL = `
  https://mate-academy.github.io/phone-catalogue-static/api`;

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      };

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(new Error(
          'content-type is not correcte'
        ));
      };

      return response.json();
    });
};

const getPhones = () => request('/phones.json');
const getPhoneDetails = (endPoint) => request(`/phones/${endPoint}.json`);

getPhones()
  .then(response => generateList(response))
  .then(phoneIds => getPhonesDetails(phoneIds))
  .then(phonesDetails => console.log(phonesDetails))
  .catch(() => console.warn(new Error()));

function generateList(phonesList) {
  const body = document.querySelector('body');
  const ul = document.createElement('ul');

  body.append(ul);

  return phonesList.map(phone => {
    const li = document.createElement('li');

    li.innerText = phone.name;
    ul.append(li);

    return phone.id;
  });
}

function getPhonesDetails(idsList) {
  const PhoneDetails = idsList.map(id => getPhoneDetails(id));

  return Promise.all(PhoneDetails);
}
