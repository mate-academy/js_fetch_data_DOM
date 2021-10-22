'use strict';

// write your code here
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static'
  + '/api/phones.json';
const DETAILS_URL = 'https://mate-academy.github.io/phone-catalogue-static'
  + '/api/phones/';

// utility request => getPhones + getPhonesDetails
function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          throw response;
        }, 5000);
      }

      return response.json();
    });
};

function getPhones() {
  return request(BASE_URL);
};

const getPhonesDetails = (phoneId) => {
  return request(`${DETAILS_URL}${phoneId}.json`);
};

// getting an array of phones via Promise.all and display to the page
getPhones()
  .then(arr => {
    Promise.all([...arr.map(phone => getPhonesDetails(phone.id))])
      .then(allPhones => {
        const ul = document.createElement('ul');

        allPhones.forEach(phone => {
          const li = document.createElement('li');

          li.append(phone.name);
          ul.append(li);
        });

        document.body.append(ul);
      });
  });
