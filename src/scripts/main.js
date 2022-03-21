'use strict';

const phonesUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const phonesDetailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          // throw `${response.status} - ${response.statusText}`;
        }, 5000);
      }

      return response.json();
    });
}

function getPhonesDetails(phonesDataArray) {
  const phoneDetailsArray = [];

  for (const phone of phonesDataArray) {
    fetch(`${phonesDetailsUrl}${phone}.json`)
      .then(response => response.json())
      .then(phoneDetails => {
        phoneDetailsArray.push(phoneDetails);
        makeDom(phoneDetails.name);
      })
      .catch(error => {
        error('Error:', error);
      });
  }

  return phoneDetailsArray;
}

function makeDom(elementName) {
  const body = document.querySelector('body');

  if (!document.querySelector('ul')) {
    const ul = document.createElement('ul');

    body.append(ul);

    ul.insertAdjacentHTML('beforeend',
      `<li>${elementName}</li>`);
  } else {
    const namesList = document.querySelector('ul');

    namesList.insertAdjacentHTML('beforeend',
      `<li>${elementName}</li>`);
  }
}

getPhones(phonesUrl).then(phones => {
  getPhonesDetails(phones.map(element => element.id));
});
