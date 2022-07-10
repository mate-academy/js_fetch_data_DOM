'use strict';

const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

getPhones(fetch(url));

function getPhones(promise) {
  promise.then(response => {
    if (!response.ok) {
      setTimeout(() => {
        return Promise.reject(new Error(`can't load`));
      }, 5000);
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      return Promise.reject(new Error('application is not supported'));
    }
  });

  promise.then(response => response.json())
    .then(phones => {
      getPhonesDetails(phones);

      return phones;
    })
    .catch(error => alert(error));
}

function getPhonesDetails(phones) {
  const phonesWithDetails = [];
  const phonesName = [];

  phones.forEach(phone => {
    phonesWithDetails.push(phone);
    phonesName.push(phone.name);
  });

  if (phonesName.length === 0) {
    return Promise.reject(new Error('0 phones'));
  }

  createList(phonesName);

  return phonesWithDetails;
}

function createList(phonesName) {
  const list = document.createElement('ul');

  phonesName.forEach(phoneName => {
    const item = document.createElement('li');

    item.innerText = phoneName;
    list.append(item);
  });
  document.body.append(list);
}
