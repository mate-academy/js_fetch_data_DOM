'use strict';

// eslint-disable-next-line max-len
const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line max-len
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const list = document.createElement('ul');

const getPhones = () => {
  return fetch(listUrl)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          throw new Error(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (phone) => {
  return fetch(`${detailsUrl}${phone}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

getPhones()
  .then(phones => {
    const phoneList = phones.map(phone => getPhonesDetails(phone.id));

    Promise.all(phoneList)
      .then(phoneInfo => {
        phoneInfo.forEach(phone => {
          const phoneDOM = document.createElement('li');

          phoneDOM.innerHTML = phone.name;

          list.append(phoneDOM);
        });
      });
  })
  .catch(error => {
    throw new Error(error);
  });

document.body.append(list);
