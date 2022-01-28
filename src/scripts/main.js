'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesIds = [];
const detailsArray = [];
const body = document.body;
const phonesWithDetails = [];

body.style.flexDirection = 'column';

function onSuccess(phoneName) {
  body.insertAdjacentHTML('beforeend', `
    <div class="name">
      ${phoneName}
    </div>
  `);
}

function onError(message) {
  body.insertAdjacentHTML('beforeend', `
    <div class="warning">
      ${message}
    </div>
  `);
}

const request = (url) => {
  return fetch(`${baseUrl}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        );
      }

      return response.json();
    });
};

const getPhones = () => {
  return request('/phones.json');
};

const getPhonesDetails = (detailUrl) => {
  return request(`/phones/${detailUrl}.json`);
};

getPhones()
  .then(phones => phones)
  .then(result => {
    for (const phone of result) {
      phonesIds.push(phone.id);
      onSuccess(phone.name);
      phonesWithDetails.push(phone);
    }
  })
  .then(phonesId => {
    for (const id of phonesIds) {
      getPhonesDetails(id)
        .then(detail => detailsArray.push(detail))
        .catch(error => error);
    }

    for (const phone of phonesWithDetails) {
      getPhonesDetails(phone.id)
        .then(detail => {
          Object.assign(phone, detail);
        })
        .catch(onError);
    }
  })
  .catch(error => {
    setTimeout(() => {
      onError(error);
    }, 5000);
  });
