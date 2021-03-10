'use strict';

const root = document.querySelector('body');
const LIST_URL = 'https://mate-academy.github.io'
  + '/phone-catalogue-static/api/phones.json';
const BASE_DETAILS_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones';
let phonesWithDetails = [];

const getPhones = () => {
  const resolver = (resolve, reject) => {
    fetch(LIST_URL)
      .then(res => res.json())
      .then(data => resolve(data));

    setTimeout(() => {
      reject(new Error('Timeout has been exceed'));
    }, 5000);
  };

  return new Promise(resolver);
};

const getPhonesDetails = (ids) => {
  const promiseArray = ids.map(id => {
    const url = `/${id}.json`;
    const resolver = (resolve, reject) => {
      fetch(`${BASE_DETAILS_URL}${url}`)
        .then(res => res.json())
        .then(details => resolve(details))
        .catch(error => reject(error));
    };

    return new Promise(resolver);
  });

  return Promise.all(promiseArray);
};

const renderPhoneNames = (phones) => {
  const list = document.createElement('ul');

  phones.forEach(phone => {
    const item = document.createElement('li');

    item.innerText = phone.name;
    list.append(item);
  });

  root.append(list);
};

const phoneList = getPhones();

phoneList
  .then(phones => {
    phonesWithDetails = [...phones];

    return phones.map(phone => phone.id);
  })
  .then(ids => getPhonesDetails(ids))
  .then(details => {
    for (let i = 0; i < details.length; i++) {
      phonesWithDetails[i].details = details[i];
    }

    renderPhoneNames(phonesWithDetails);
  })
  .catch(error => root.insertAdjacentHTML('beforeend', `
    <block>${error}</block>
  `));
