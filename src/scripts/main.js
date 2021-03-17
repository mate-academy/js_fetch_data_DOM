'use strict';

// write your code here
// eslint-disable-next-line
const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json';

const listPhone = document.createElement('ul');
const phonsData = [];

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => {
        return response.json();
      })
      .then(result => resolve(result));

    setTimeout(() => {
      return reject(new Error());
    }, 5000);
  });
};

const getPhonesDetails = (list) => {
  const listofPhones = list.map(phone => phone.id);
  const fetchList = listofPhones.map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(fetchList);
};

getPhones(listUrl)
  .then(result => {
    result.map(value => {
      const listItem = document.createElement('li');

      listItem.textContent = value.name;
      listPhone.append(listItem);
      phonsData.push(value.id);
    });

    return phonsData;
  })
  .then(phones => getPhonesDetails(phones));

document.body.append(listPhone);
