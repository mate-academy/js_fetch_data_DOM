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

function getPhoneDetails(id) {
  return fetch(`${detailsURL}` + `${id}.json`)
    .then(response => response.json());
}

getPhones().then(result => {
  const phonesIds = result.map(phone => getPhoneDetails(phone.id));

  Promise.all([...phonesIds]).then(phone => {
    phone.forEach(el => {
      newList.insertAdjacentHTML('afterbegin', `
      <li>
      PHONE NAME: ${el.name}
      </li>
      `);
    });
  });
});
