'use strict';

const listUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const detailsUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const body = document.body;
const list = document.createElement('ul');

body.append(list);

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(listOfPhones => resolve(listOfPhones));

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
}

function addPhoneNamesList(phones) {
  const phonesIds = phones.map(phone => {
    const phoneName = document.createElement('li');

    phoneName.innerText = phone.name;
    list.append(phoneName);

    return phone.id;
  });

  return phonesIds;
}

function getPhonesDetails(ids) {
  const phoneDetails = ids
    .map(id => (fetch(`${detailsUrl}${id}.json`)));

  return Promise.all(phoneDetails);
}

getPhones()
  .then(addPhoneNamesList)
  .then(getPhonesDetails)
  .catch(() => new Error('failed data'));
