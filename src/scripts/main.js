'use strict';

const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}.json`)
      .then(response => response.json())
      .then(phones => {
        resolve(phones);
      });

    setTimeout(() => reject(new Error()), 5000);
  });
};

const showNames = (names) => {
  const list = document.createElement('ul');

  for (const phone of names) {
    const item = document.createElement('li');

    item.textContent = phone;
    list.append(item);
  }

  document.body.append(list);
};

function getPhonesDetails(IDs) {
  const phonesDetails = [];

  return new Promise((resolve, reject) => {
    for (const id of IDs) {
      fetch(`${baseUrl}/${id}.json`)
        .then(response => response.json())
        .then(details => {
          phonesDetails.push(details);
        })
        .catch(() => reject(new Error('Something wrong')));
    }

    resolve(phonesDetails);
  });
};

getPhones()
  .then((phones) => {
    const allIDs = phones.map(phone => phone.id);

    const allNames = phones.map(phone => phone.name);

    showNames(allNames);
    getPhonesDetails(allIDs);
  });
