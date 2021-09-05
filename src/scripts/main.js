'use strict';

// write your code here
const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const listOfPhones = document.createElement('td');

function getPhones() {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          alert(`${response.status} - ${response.text}`);
        }, 5000);
      }

      return response.json();
    });
}

function getPhonesDetails(id) {
  return fetch(`${DETAILS_URL}${id}.json`)
    .then(response => {
      if (!response.ok) {
        alert(`${response.status} - ${response.text}`);
      }

      return response.json();
    });
}

getPhones()
  .then(phones => {
    const listOfPhonesDetails
      = phones.map(phone => getPhonesDetails(`${phone.id}`));

    Promise.all(listOfPhonesDetails)
      .then(phoneDetals => {
        phoneDetals.map(currentPhone => {
          const phone = document.createElement('tr');

          phone.textContent = currentPhone.name;
          listOfPhones.append(phone);
        });
      });
  })
  .catch(error => alert(error));

document.body.append(listOfPhones);
