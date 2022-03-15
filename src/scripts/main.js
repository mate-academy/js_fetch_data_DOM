'use strict';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
const bodyTag = document.querySelector('body');

document.querySelector('h1').style.display = 'none';

bodyTag.insertAdjacentHTML('afterbegin',
  `<table>
    <tbody id="listOfPhones"></tbody>
  </table>`);

const table = document.getElementById('listOfPhones');

const request = (url) => {
  return fetch(`${BASE_URL}api/phones${url}.json`)
    .then((response) => {
      setTimeout(() => {
        if (!response.ok) {
          return Promise.reject(
            new Error(`${response.status} - not found`)
          );
        }
      }, 1000);

      return response.json();
    });
};

const getPhones = () => request('');
const getPhonesDetails = (phoneUrl) => request(`/${phoneUrl}`);

document.querySelector('table').insertAdjacentHTML('beforeend',
  `<thead>
    <tr>
      <td>Name of phone</td>
      <td>Operation system</td>
      <td>Image</td>
    </tr>
  </thead>
`);

getPhones()
  .then(data => {
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
