'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json';

/* fetch('detailsUrl')
  .then(response => response.json())
  .then(data => console.log(data.map(phone => phone.id)))
  .catch(error => console.log(error)); */

function getPhones(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(result => resolve(result));

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
};

function getPhonesDetails(ids) {
  const phones = ids.map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(phones);
}

const list = document.createElement('ul');
const body = document.querySelector('body');

getPhones(listUrl)
  .then(items => {
    items.forEach(item => {
      const listItem = document.createElement('li');

      listItem.textContent = item.name;
      list.append(listItem);
    });

    return listUrl.map(phone => phone.id);
  })
  .then(result => getPhonesDetails(result));

body.append(list);
