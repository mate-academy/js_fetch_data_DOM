/* eslint-disable no-console */
'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(result => resolve(result));

    setTimeout(() => reject(new Error('end')), 5000);
  });
}

function getPhonesDetails(idsData) {
  const items = idsData.map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(items);
}

const phonesIdsData = [];

const list = document.createElement('ul');

getPhones(listUrl)
  .then(result => {
    for (const item of result) {
      const listItem = document.createElement('li');

      listItem.textContent = item.name;
      list.append(listItem);
      phonesIdsData.push(item.id);
    }

    return phonesIdsData;
  })
  .then(items => getPhonesDetails(items));
document.body.append(list);
