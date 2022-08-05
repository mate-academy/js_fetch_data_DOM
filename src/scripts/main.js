'use strict';

// eslint-disable-next-line max-len
const listURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line max-len
const detailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status}`)
          );
        }, 5000);
      }

      return response.json();
    });
}

const getPhones = () => {
  return request(listURL)
    .then(phones => {
      return phones;
    });
};

function getPhonesDetails(phones) {
  const phonesWithDetails = phones.map(({ id }) => {
    return request(`${detailsURL}${id}.json`);
  });

  return Promise.all(phonesWithDetails);
}

function createList(arr) {
  document.body.insertAdjacentHTML('beforeend', `
    <ul>
      ${arr.map((phone) => `
        <li>${phone.name}</li>
      `).join('')}
    </ul>
  `);
}

getPhones()
  .then(getPhonesDetails)
  .then(createList)
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(new Error(error));
  });
