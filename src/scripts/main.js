'use strict';
/* eslint-disable no-console */

const request = require('./request');
const getPhones = () => request('/phones.json', 5);
const getPhonesDetails = (id) => request(`/phones/${id}.json`);

const phoneDetails = [];

const createList = (items) => {
  const ul = document.createElement('ul');

  for (const item of items) {
    const li = document.createElement('li');

    li.textContent = item.name;
    ul.append(li);
  }

  document.body.append(ul);

  items.map(({ id }) => getPhonesDetails(id)
    .then((data) => phoneDetails.push(data))
    .catch((e) => console.warn(e)));
};

getPhones()
  .then(createList)
  .catch((e) => console.warn(e));

console.log(phoneDetails);
