'use strict';

const listUrl = `https://mate-academy.github.io/phone-catalogue-static/api/
phones.json`;

const detailsUrl = `
https://mate-academy.github.io/phone-catalogue-static/api/phones/`;

function getPhones() {
  return fetch(listUrl)
    .then(responce => {
      if (!responce.ok) {
        throw setTimeout(() => {
          return Promise.reject(new Error('No data found ' + responce.status));
        }, 5000);
      }

      if (!responce.headers.get('content-type').includes('application/json')) {
        throw setTimeout(() => {
          return Promise.reject(new Error('Content-type is not suported '
          + responce.status));
        }, 5000);
      }

      return responce.json();
    })
    .then(result => result);
}

function getPhonesDetails(ids) {
  return fetch(`${detailsUrl}/${ids}.json`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Something has gone really bad!'));
      }

      return response.json();
    });
}

getPhones()
  .then(phones => {
    const idArr = phones.map(phone => getPhonesDetails(phone.id));

    const div = document.createElement('div');

    document.body.append(div);

    Promise.all(idArr).then(result => {
      result.map(phone => {
        const p = document.createElement('p');

        p.textContent = phone.name;
        document.body.append(p);
        div.append(p);
      });
    });
  })
  .catch(error => error);
