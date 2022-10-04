'use strict';

const BASE_URL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const phoneList = document.querySelector('.phone_list');

getPhones(`${BASE_URL}.json`)
  .then(phones => {
    const idArr = phones.map(phone => phone.id);

    getPhoneDetails(idArr);
  })
  .catch(error => new Error(error));

function getPhones(url) {
  const promise = new Promise((resolve, reject) => {
    request(url)
      .then(res => resolve(res))
      .catch(error => setTimeout(() => reject(new Error(error)), 5000));
  });

  return promise;
}

function getPhoneDetails(phoneIds) {
  phoneIds.forEach(phoneId => {
    request(`${BASE_URL}/${phoneId}.json`)
      .then(phoneDetail => {
        const li = document.createElement('li');

        li.innerText = phoneDetail.name;
        phoneList.appendChild(li);
      })
      .catch((error) => new Error(error));
  });
}

function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          Error(`Error: ${response.status} - ${response.statusText}`)
        );
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(
          Error('Error: Content type is not supported!')
        );
      }

      return response.json();
    });
}
