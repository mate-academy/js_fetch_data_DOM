'use strict';

function request(url) {
  return fetch(url)
    .then(response => Promise.resolve(response.json()))
    .catch(error => Promise.reject(error));
}

function getPhones() {
  return request(
    'https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
}

function getIds(phones) {
  const result = [];

  for (const phone of phones) {
    result.push(phone.id);
  }

  return result;
}

function getPhonesDetails(ids) {
  const result = [];

  for (const id of ids) {
    result.push(request(
      `https://mate-academy.github.io/phone-catalogue-static/api/phones/${
        id}.json`));
  }

  return Promise.all(result);
}

function showNames(phones) {
  const list = document.createElement('ul');

  phones.forEach(phone =>
    list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`));
  document.querySelector('body').prepend(list);
}

getPhones()
  .then(phones => {
    showNames(phones);

    getPhonesDetails(getIds(phones))
      .then(response => {
        const phonesWithDetails = [];

        for (let i = 0; i < phones.length; ++i) {
          phonesWithDetails.push(Object.assign(phones[i], response[i]));
        }
      });
  });
