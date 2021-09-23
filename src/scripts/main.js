'use strict';

const LIST_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api';
const DETAILS_URL = 'https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/phones/:phoneId.json';

const request = (url) => {
  return fetch(`${LIST_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw setTimeout(() => {
          alert(`${response.status}`);
        }, 5000);
      };

      return response.json();
    });
};

const getPhone = () => request('/phones.json');

const createList = (text) => {
  const ul = document.createElement('ul');

  text.forEach(elem => {
    ul.insertAdjacentHTML(`beforeend`, `
          <li>${elem.name}</li>
          `);
  });

  document.body.append(ul);

  return text;
};

function getPhonesDetails(data) {
  const devicesId = data.map(device => device.id);

  const promiseAll = devicesId.map(
    id => fetch(`${DETAILS_URL}${id}.json`)
  );

  return Promise.all(promiseAll);
}

getPhone()
  .then(text => createList(text))
  .then(phones => getPhonesDetails(phones))
  .catch(error => alert(error));
