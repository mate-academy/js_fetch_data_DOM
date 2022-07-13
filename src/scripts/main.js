'use strict';

const urlList
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const urlDetails
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const phonesList = document.createElement('ul');

const getPhones = () => {
  return fetch(urlList)
    .then(response => response.json())
    .catch(error => {
      setTimeout(() => {
        Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (id) => {
  fetch(`${urlDetails}` + `${id.json}`)
    .then(response => response.json())
    .catch(error => Error(error));
};

getPhones()
  .then(list => {
    const phoneDetails = list.map(phone => getPhonesDetails(`${phone.id}`));

    Promise.all([...phoneDetails])
      .then(details => {
        details.forEach(item => {
          const phone = document.createElement('li');

          phone.textContent = item.id;
          phonesList.append(phone);
        });
      });
  });

document.body.append(phonesList);
