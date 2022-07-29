'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones';

let phonesWithDetails = [];

const request = (url = '') => {
  return fetch(`${BASE_URL}${url}.json`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = () => request();

function getPhonesDetails(arr) {
  return Promise.all(arr.map(phone => request(`/${phone.id}`)))
    .then(result => {
      result.forEach(el => phonesWithDetails.push(el));

      document.body.insertAdjacentHTML('afterbegin',
        `
     <ul>
     ${result.map(phone => `<li>${phone.name}</li>`).join('')}
     </ul>
       `
      );
    });
}

getPhones()
  .then(result => {
    getPhonesDetails(result);
  })
  .catch(error => {
    window.console.warn(error);
  });
