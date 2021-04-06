'use strict';

// write your code here

const phonesUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const options = {
  method: 'GET',
};

const list = document.createElement('ul');

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(`${phonesUrl}/phones.json`, options)
      .then(response => {
        return response.json();
      })
      .then(result => {
        resolve(result);
      });

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
};

const createListOfPhones = (phones) => {
  list.insertAdjacentHTML('afterbegin', `
     ${phones.map(phone => phone.name).map(item => `
        <li>${item}</li>
    `).join(' ')}
  `);

  document.body.append(list);

  return phones;
};

const getPhonesDetails = (ids) => {
  const fetchedList = ids.map(id => fetch(`${phonesUrl}/phones/${id}.json`));

  return Promise.all(fetchedList);
};

getPhones()
  .then(createListOfPhones)
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails)
  .catch(error => {
    throw new Error(error);
  });
