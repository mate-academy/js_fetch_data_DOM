'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILED_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const newItem = document.createElement('th');

const getPhones = () => {
  return fetch(BASE_URL)
    .then((response) => response.json())
    .catch(error => {
      setTimeout(() => {
        Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (id) => {
  return fetch(`${DETAILED_URL}` + `${id}.json`)
    .then((response) => response.json())
    .catch((error) => new Error(error));
};

getPhones()
  .then(list => {
    const contacts = list.map(phone => getPhonesDetails(`${phone.id}`));

    Promise.all([...contacts])
      .then(phoneDetails => {
        phoneDetails.forEach(item => {
          const newPhone = document.createElement('li');

          newPhone.textContent = item.name;
          newItem.append(newPhone);
        });
      });
  });

document.body.append(newItem);
