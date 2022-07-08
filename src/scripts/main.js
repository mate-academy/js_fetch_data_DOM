'use strict';

// write your code here
const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

// eslint-disable-next-line max-len
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const ul = document.createElement('ol');

document.body.append(ul);

const request = (url) => {
  return fetch(url)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
      }, 5000);

      return response.json();
    });
};

const getPhones = () => request(listUrl)
  .then(result => {
    const ids = result.map(phone => phone.id);

    getPhonesDetails(ids);
  });

const getPhonesDetails = (list) => {
  list.forEach(phone => request(`${detailsUrl}${phone}.json`)
    .then(data => ul.insertAdjacentHTML('beforeend', `
      <li>${data.id}</li>
    `))
  );
};

getPhones();
