'use strict';

/* eslint-disable */

const ListURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const detailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json';

/* eslint-enable */

renderPhones();

function renderPhones() {
  const phoneListDOM = document.querySelector('.phone_list');

  getPhones(ListURL)
    .then(phones => {
      const phoneNames = phones.map(phone => phone.name);

      phoneNames.forEach(phoneName => {
        const li = document.createElement('li');

        li.innerText = phoneName;
        phoneListDOM.appendChild(li);
      });
    });
}

function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error();
      }

      return response.json();
    });
}

function getPhones(url) {
  return request(url);
}

/* function getPhoneDetails (url) {
  return request(url);
} */

// getPhoneDetails(detailsBaseURL + 'motorola-xoom-with-wi-fi' + '.json');
