'use strict';

const listURL
= `https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;

const detailsURL
= `https://mate-academy.github.io/phone-catalogue-static/api/phones/`;

const newList = document.createElement('ul');

document.body.insertAdjacentElement('beforeend', newList);

function getPhones() {
  return fetch(listURL)
    .then(response => response.json());
}

function getPhonesDetails(id) {
  return fetch(`${detailsURL}` + `${id}.json`)
    .then(response => response.json());
}

getPhones().then(result => {
  const phonesIds = result.map(phone => phone.id);

  for (const key of phonesIds) {
    getPhonesDetails(key).then(phone => {
      newList.insertAdjacentHTML('afterbegin', `
      <li>
      PHONE NAME: ${phone.name}
      <br>
      PHONE DETAILS: ${phone.id}
      </li>
      `);
    });
  };
});
