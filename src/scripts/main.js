/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          Promise.reject(new Error(
            `${response.status} - ${response.statusText}`)
          );
        }, 5000);
      }

      return response.json();
    })
    .then(result => result);
};

const getPhones = () => request('/phones.json');
const getPhonesDetails = (phoneId) => request(`/phones/${phoneId}.json`);

function showPhoneNames(phones) {
  const newBlock = document.createElement('div');

  newBlock.id = 'information';
  newBlock.style.top = '50px';
  newBlock.style.right = '50px';
  newBlock.style.position = 'absolute';

  const phoneList = document.createElement('ol');

  newBlock.append(phoneList);

  phones.forEach(phone => {
    const phoneName = document.createElement('li');

    phoneName.textContent = phone.name;
    phoneList.append(phoneName);
  });
  document.body.prepend(newBlock);
}

let phonesWithDetails = {};
const getPhonesWithDetails = () => {
  return getPhones()
    .then(result => Promise.all(
      result.map(phone => getPhonesDetails(phone.id)
        .then(details => phonesWithDetails = {
          ...phone, ...details,
        })
      )
    ));
};

getPhones()
  .then(result => {
    console.log(`Phones`, result);
    showPhoneNames(result);
  })
  .catch(error => console.warn(`Phones error:`, error));

getPhonesDetails('dell-streak-7')
  .then(result => console.log(`Phones details`, result))
  .catch(error => console.warn(`Phones details error:`, error));

getPhonesWithDetails()
  .then(result => console.log(`Phones with details:`, result))
  .catch(error => console.warn(`Phones with details error:`, error));
