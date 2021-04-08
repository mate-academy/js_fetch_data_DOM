'use strict';

const url = 'https://mate-academy.github.io/phone-catalogue-static/api';

const listOfPhones = document.createElement('ul');

document.body.append(listOfPhones);

function getPhonesFromApi() {
  return fetch(`${url}/phones.json`);
}

function getPhones() {
  return new Promise((resolve, reject) => {
    getPhonesFromApi()
      .then(response => response.json())
      .then(data => resolve(data));

    setTimeout(() => reject(
      new Error('error: No answer from server.')
    ), 5000);
  });
}

function displayPhones(phones) {
  phones.forEach(phone => {
    const phoneListItem = document.createElement('li');

    phoneListItem.textContent = phone.name;
    listOfPhones.append(phoneListItem);
  });
}

function getPhonesDetails(phonesIds) {
  const fetchedList = phonesIds.map(id => fetch(`${url}/phones/${id}.json`));

  return Promise.all(fetchedList);
};

getPhones()
  .then(displayPhones)
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails)
  .catch(error => {
    throw new Error(error);
  });
