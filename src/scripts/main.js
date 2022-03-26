'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
const bodyTag = document.querySelector('body');

document.querySelector('h1').style.display = 'none';

bodyTag.insertAdjacentHTML('afterbegin',
  `<table>
    <tbody id="listOfPhones"></tbody>
  </table>`);

const table = document.getElementById('listOfPhones');
const request = (url = '') => {
  return fetch(`${BASE_URL}api/phones${url}.json`)
    .then((response) => {
      return response.json();
    });
};

const getPhones = () => request();

const getPhonesDetails = (phoneUrl) => request(`/${phoneUrl}`);

getPhones()
  .then(data => {
    if (!data.ok) {
      setTimeout(() => {
        return Error(`${data.status} - not found`);
      }, 5000);
    }

    data.map(phone => {
      getPhonesDetails(phone.id)
        .then(phoneDetails => {
          table.insertAdjacentHTML('beforeend',
            `<tr>
              <td>${phoneDetails.id})</td>
              <td>${phoneDetails.android.os}</td>
              <td><img src=${BASE_URL}${phoneDetails.images[0]}></td>
            </tr>
          `);
        });
    });
  });
