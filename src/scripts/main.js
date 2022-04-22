'use strict';

const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const body = document.querySelector('body');
const pnoneList = document.createElement('ul');

body.style.flexDirection = 'column';
body.append(pnoneList);

const getPhones = () => {
  return fetch(`${baseUrl}.json`)
    .then((response) => response.json())
    .catch(logError, 5000);
};

const getPhonesDetails = (id) => {
  return fetch(`${baseUrl}/${id}.json`)
    .then((response) => response.json())
    .catch(logError);
};

const logError = (error, time = 0) => {
  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.warn('Error occurred!', error);
  }, time);
};

function addPhonesNames() {
  getPhones()
    .then(phonesList => {
      phonesList.map(phone => {
        const listItem = document.createElement('li');

        pnoneList.append(listItem);

        getPhonesDetails(phone.id)
          .then((details) => {
            listItem.innerHTML = `
              <b>${phone.name}</b>
              <p>${Object.entries(details)
    .map(([key, value]) => `
                  <i>${key}</i>: ${filter(value)}<br>
                `).join('')}
              </p>
            `;
          });
      });
    });
}

addPhonesNames();

function filter(someValue) {
  return JSON.stringify(someValue)
    .replace(/["{}]/g, '')
    .replace('[', '')
    .replace(']', '')
    .replace(/,/g, ', ')
    .replace(/:/g, ': ');
}
