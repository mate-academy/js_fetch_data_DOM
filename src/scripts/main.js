'use strict';

const promise = getPhones(
  'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json');
const phoneList = [];
const phoneDetailsList = [];

function getPhones(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(lists => resolve(lists));

    setTimeout(() => reject(new Error()), 5000);
  });
}

promise
  .then(list => {
    const ul = document.createElement('ul');

    document.body.append(ul);

    for (const elem of list) {
      phoneList.push(elem.id);

      const li = document.createElement('li');

      li.innerText = elem.name;
      ul.append(li);
    };
    getPhonesDetails(phoneList);
  })
  .catch(new Error('error!'));

function getPhonesDetails(arrayOfIds) {
  return new Promise((resolve, reject) => {
    for (const elem of arrayOfIds) {
      fetch(
        `https://mate-academy.github.io/`
        + `phone-catalogue-static/api/phones/${elem}.json`)
        .then(response => response.json())
        .then(phoneDetail => phoneDetailsList.push(phoneDetail))
        .catch(new Error('error!'));
    };
  });
};
