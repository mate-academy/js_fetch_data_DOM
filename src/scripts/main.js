/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-throw-literal */
/* eslint-disable max-len */
'use strict';

const LIST_PHONES_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const DETAILS_PHONES_URL = ' https://mate-academy.github.io/phone-catalogue-static/api/phones';

const phonesWithDetails = [];

const request = (BASE_URL, url = '.json') => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      setTimeout(() => {
        return Promise.reject(`${response.status} - ${response.statusText}`);
      }, 5000);
    });
};

const getPhones = () => {
  return request(LIST_PHONES_URL);
};

const getPhonesDetails = (phoneId) => {
  return request(DETAILS_PHONES_URL, `/${phoneId}.json`);
};

const warmMessage = (message) => {
  const div = document.createElement('div');

  div.className = 'message-warm';
  div.textContent = message;
  document.body.prepend(div);

  setTimeout(() => {
    div.remove();
  }, 5000);
};

const getInfoOnScreen = () => {
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.className = 'phones-list';
  div.append(ul);

  phonesWithDetails.forEach(phone => {
    const li = document.createElement('li');

    li.textContent = JSON.stringify(phone);
    ul.append(li);
  });
  document.body.prepend(div);
};

getPhones()
  .then((phones) => {
    return Promise.all(phones.map(phone => {
      phonesWithDetails.push(phone);

      return getPhonesDetails(phone.id);
    }));
  })
  .then(details => {
    details.forEach(detail => {
      phonesWithDetails.forEach(phone => {
        if (phone.id === detail.id) {
          phone.details = detail;
        }
      });
    });

    getInfoOnScreen();
  })
  .catch(error => warmMessage(error));


