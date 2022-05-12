'use strict';

const baseURL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const listURL = `${baseURL}/phones.json`;
const detailsURL = `${baseURL}/phones`;
const phonesList = document.createElement('ul');

function request(url) {
  return fetch(url)
    .then(response => response.json());
};

document.body.append(phonesList);

const getPhones = () => {
  request(listURL)
    .then(result => {
      const phoneID = result.map(phone => phone.id);

      getPhonesDetail(phoneID);
    })
    .catch(error =>
      setTimeout(() => new Error(error)), 5000);
};

const getPhonesDetail = (phonesId) => {
  phonesId.forEach(id => {
    request(`${detailsURL}/${id}.json`)
      .then(result => {
        const phoneName = document.createElement('li');

        phoneName.innerText = result.name;
        phonesList.append(phoneName);
      });
  });
};

getPhones();
