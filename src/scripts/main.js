'use strict';

const bURL = `https://mate-academy.github.io/phone-catalogue-static/api/phones`;
const body = document.querySelector('body');

const request = (url, options) => {
  return fetch(`${bURL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw setTimeout(() => `${response.status}`, 5000);
      };

      return response.json();
    });
};

const getPhones = () => request('.json');
const getPhoneDetails = (url) => request(`/${url}.json`);

getPhones()
  .then(result => {
    const ids = [];

    for (const phone of result) {
      ids.push(phone.id);

      body.insertAdjacentHTML('afterbegin',
        `<div>
          <p>${phone.name}</p>
        </div>`);
    };

    return ids;
  })
  .then(result => {
    const phoneDetails = [];

    for (const id of result) {
      getPhoneDetails(id)
        .then(resolve => {
          phoneDetails.push(resolve);
        })
        .catch();
    };

    return phoneDetails;
  })
  .catch();
