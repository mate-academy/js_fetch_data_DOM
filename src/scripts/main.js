'use strict';
// eslint-disable-next-line
const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => {
        return response.json();
      })
      .then(result => resolve(result));

    setTimeout(() => reject(new Error()), 5000);
  });
};

const getPhonesDetails = (list) => {
  const fetchedList = list.map(phone => phone.id)
    .map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(fetchedList);
};

const createListofPhones = (data) => {
  const listofPhones = document.createElement('ul');

  listofPhones.insertAdjacentHTML('afterbegin', `
    ${data.map(phone => phone.name).map(item => `<li>${item}</li>`).join(' ')}

  `);

  document.body.append(listofPhones);

  return data;
};

getPhones()
  .then(createListofPhones)
  .then(getPhonesDetails)
  .catch(() => new Error());
