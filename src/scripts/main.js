'use strict';

const listURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const list = document.createElement('ul');

const getPhones = () => {
  return fetch(listURL)
    .then(response => {
      if(!response.ok) {
        return setTimeout(() => {
          throw new Error(`${response.status}: ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (phoneID) => {
  return fetch(`${detailsURL}${phoneID}.json`)
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
  });
};

getPhones()
  .then(phones => {
    const phonesList = phones.map(phone => getPhonesDetails(phone.id));

    Promise.all(phonesList)
      .then(phoneData => {
        phoneData.forEach(phone => {
          const phoneLi = document.createElement('li');

          phoneLi.innerHTML = phone.name;

          list.appendChild(phoneLi);
        });
      })
  })
  .catch(error => {
    throw new Error(error);
  });

document.body.appendChild(list);
