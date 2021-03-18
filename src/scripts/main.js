'use strict';

const PHONES_URL
  = `https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;
const PHONES_DETAILES_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(PHONES_URL)
      .then(response => response.json())
      .then(phones => resolve(phones));

    setTimeout(() => reject(new Error()), 5000);
  });
}

function getPhonesDetails(idList) {
  const detailsList = idList.map(id => {
    return fetch(`${PHONES_DETAILES_URL + id}.json`);
  });

  return Promise.all(detailsList);
}

const container = document.createElement('ul');

document.body.append(container);

getPhones()
  .then(phones => {
    phones.forEach(phone => {
      const phoneElement = document.createElement('li');

      phoneElement.textContent = phone.name;
      container.append(phoneElement);
    });

    return phones;
  })
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails)
  .catch(() => new Error());
