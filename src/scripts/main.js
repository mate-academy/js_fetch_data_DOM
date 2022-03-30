/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');
const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const getPhones = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Can't load list of phones`);
      };

      return response.json();
    });
};

getPhones()
  .then(printList)
  .catch(logError);

function printList(value) {
  const ul = document.createElement('ul');

  for (let i = 0; i < value.length; i++) {
    const li = document.createElement('li');

    li.textContent = value[i].name;
    ul.append(li);
  };
  body.append(ul);
};

function logError(error) {
  setTimeout(() => {
    console.warn(error);
  }, 5000);
};

function getPhonesDetails(phones) {
  for (const key of phones) {
    const getDetails = () => {
      return fetch(`${url.slice(0, -5)}/${key.id}.json`)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(`Can't load details of phone`);
          };

          return response.json();
        });
    };

    getPhones()
      .then(getDetails)
      .catch(logErrorDetails);
  };
};

getPhones()
  .then(getPhonesDetails);

function logErrorDetails(error) {
  console.warn(error);
};
