'use strict';

// write your code here
const listURL = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;
const detailsURL = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones/`;

const getPhones = () => {
  return fetch(listURL)
    .then(response => response.json())
    .catch(error => setTimeout(() => error, 5000));
};

getPhones()
  .then(createList)
  .then(getPhonesDetails)
  .catch(() => new Error());

function createList(phonesList) {
  const body = document.querySelector('body');
  const ul = document.createElement('ul');

  body.append(ul);

  return phonesList.map(phone => {
    const li = document.createElement('li');

    li.innerText = phone.name;
    ul.append(li);

    return phone.id;
  });
}

function getPhonesDetails(ids) {
  const urls = ids.map(phone => `${detailsURL}${phone}.json`);

  return Promise.all(urls);
};
