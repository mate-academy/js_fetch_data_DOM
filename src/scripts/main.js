'use strict';

const phonesUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const phonesList = document.createElement('ul');

const getPhones = () => {
  return fetch(phonesUrl)
    .then((response) => response.json())
    .catch(error => {
      setTimeout(() => {
        Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (id) => {
  return fetch(`${detailUrl}` + `${id}.json`)
    .then((response) => response.json())
    .catch((error) => new Error(error));
};

getPhones()
  .then(list => {
    const listPhoneDetail = list.map(phone => getPhonesDetails(`${phone.id}`));

    Promise.all([...listPhoneDetail])
      .then(phoneDetails => {
        phoneDetails.forEach(item => {
          const phone = document.createElement('li');

          phone.textContent = item.name;
          phonesList.append(phone);
        });
      });
  });

document.body.append(phonesList);
