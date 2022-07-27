'use strict';

const urlList
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const urlDetails
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return fetch(urlList)
    .then(response => {
      if (!response.ok
        && response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(new Error('Error!!!'));
      }

      return response.json();
    });
};

function createList(phonesList) {
  const ul = document.createElement('ul');

  document.querySelector('body').append(ul);

  return phonesList.map(phone => {
    const li = document.createElement('li');

    li.innerText = phone.name;
    ul.append(li);

    return phone.id;
  });
}

function getPhonesDetails(id) {
  const urls = id.map(phone => `${urlDetails}${phone.id}.json`);

  return Promise.all(urls);
};

getPhones()
  .then(createList)
  .then(getPhonesDetails)
  .catch(error => setTimeout(() => error, 5000));
