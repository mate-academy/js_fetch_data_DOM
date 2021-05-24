'use strict';

const mateApiUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/';

function getPhones() {
  return new Promise((resolve, reject) => {
    sendGetRequest(`${mateApiUrl}phones.json`).then(result => resolve(result));

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Timed out');
    }, 5000);
  });
}

function getPhonesDetails(ids) {
  return Promise.all(ids.map(id => getPhoneDetails(id)));
};

function getPhoneDetails(id) {
  return new Promise((resolve, reject) => {
    sendGetRequest(`${mateApiUrl}phones/${id}.json`).then(
      result => resolve(result)).catch(error => reject(error)
    );
  });
}

function sendGetRequest(url) {
  return fetch(url).then(response => response.json());
}

function appendToList(details) {
  details.forEach(detail => {
    document.body.insertAdjacentHTML('afterbegin', `
    <span>
    PHONE NAME: ${detail.name}
    </span>
        `);
  });
}

getPhones()
  .then((phones) => {
    const ids = phones.map(phone => phone.id);

    getPhonesDetails(ids).then(details => appendToList(details));
  })
  .catch(error => new Notification(error));
