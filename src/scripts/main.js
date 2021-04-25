'use strict';

const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/phones.json')
      .then(response => response.json())
      .then(response => resolve(response));

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
}

function getPhonesDetails(ids) {
  return ids.map(phoneId =>
    fetch(API_URL + `/phones/${phoneId}.json`)
      .then(resp => resp.json()).then(resp => resp),
  );
}

getPhones()
  .then(phones => phones.map(phone => phone.id))
  .then(phonesIds => getPhonesDetails(phonesIds))
  .then(phonesDetails =>
    phonesDetails.forEach(phoneDetail => {
      phoneDetail.then(detail => {
        document.querySelector('body')
          .append(detail.name);
      });
    }),
  );
