'use strict';

// write your code here

const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailedUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const newItem = document.createElement('th');

const getPhones = () => {
  return fetch(baseUrl)
    .then((response) => response.json())
    .catch(error => {
      setTimeout(() => {
        Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (id) => {
  return fetch(`${detailedUrl}` + `${id}.json`)
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
