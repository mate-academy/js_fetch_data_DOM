'use strict';

const baseURL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const phonesIdList = [];
const phonesDetailsList = [];

function getPhonesIds(link) {
  return new Promise((resolve, reject) => {
    fetch(`${link}.json`)
      .then(data => resolve(data.json()));

    setTimeout(() => {
      reject(new Error('Request has timed out'));
    }, 5000);
  });
}

function getPhoneDetails(id) {
  return new Promise((resolve, reject) => {
    const link = `${baseURL}/${id}.json`;

    fetch(link)
      .then(response => response.json())
      .then(phone => resolve(phonesDetailsList.push(phone)));

    reject(new Error('Error'));
  });
};

const promise = getPhonesIds(baseURL);

promise
  .then(data => {
    const phonesList = document.createElement('ul');

    document.body.append(phonesList);

    data.map(phone => {
      phonesIdList.push(phone.id);

      phonesList.insertAdjacentHTML('beforeend', `
      <li>
        ${phone.name}
      </li>
      `);

      getPhoneDetails(phone.id);
    });
  });
