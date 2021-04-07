'use strict';

const listUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const detailsUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhonesFromApi() {
  return fetch(listUrl);
};

function getPhones() {
  return new Promise((resolve, reject) => {
    getPhonesFromApi()
      .then(response => resolve(response.json()));

    setTimeout(() => reject(
      new Error('Error: no data')), 5000);
  });
};

function createListOfPhones(phones) {
  const listOfPhones = document.createElement('ul');

  document.body.append(listOfPhones);

  phones.map(phone => {
    const li = document.createElement('li');

    li.textContent = phone.name;
    listOfPhones.append(li);
  });

  return phones;
}

function getDetails(ids) {
  const details = ids.map(id => (fetch(`${detailsUrl}${id}.json`)));

  return Promise.all(details);
}

getPhones()
  .then(createListOfPhones)
  .then(phones =>
    phones.map(phone => phone.id))
  .then(getDetails)
  .catch(() =>
    new Error('Error')
  );
