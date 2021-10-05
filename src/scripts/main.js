'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api';

function getPhones(url) {
  return fetch(`${BASE_URL}${url}.json`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status}`));
      }

      return response.json();
    });
}

function getPhonesDetails(arrId, url) {
  return new Promise((resolve, reject) => {
    const phonesDetails = [];

    for (const id of arrId) {
      fetch(`${BASE_URL}${url}/${id}.json`)
        .then(respons => respons.json())
        .then(phone => {
          phonesDetails.push(phone);

          if (phonesDetails.length === arrId.length) {
            resolve(phonesDetails);
          };
        })
        .catch(error => {
          reject(new Error(`что-то пошло не так ${error}`));
        });
    }
  });
}

getPhones('/phones')
  .then((phones) => {
    const phohesIdArr = [];

    for (const phone of phones) {
      if (phone.hasOwnProperty('id')) {
        phohesIdArr.push(phone.id);
      }
    }

    getPhonesDetails(phohesIdArr, '/phones')
      .then(arr => {
        const list = document.createElement('ol');

        list.innerHTML = ``;

        for (const phone of arr) {
          list.innerHTML += `
            <li>${phone.name}</li>
          `;
        }

        body.insertAdjacentElement('afterbegin', list);
      })
      .catch(error => {
        message.innerHTML = `
        <h1>ERROR</h1>
        <h2>${error}</h2>
        `;
        body.append(message);
      });
  })
  .catch((error) => {
    setTimeout(() => {
      message.innerHTML = `
      <h1>ERROR</h1>
      <h2>${error}</h2>
      `;
      body.append(message);
    }, 5000);
  });
