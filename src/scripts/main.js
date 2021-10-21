'use strict';

const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const body = document.querySelector('body');
const ids = [];

function getPhones() {
  fetch(`${url}.json`).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(`${response.status}`));
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      return Promise.reject(new Error('Wrong content-type!'));
    }

    return response.json();
  })

    .then(data => {
      const table = document.createElement('table');

      table.style.border = 'thick solid #000';

      data.forEach(element => {
        const row = document.createElement('tr');

        row.innerText = element.name;
        table.appendChild(row);
        ids.push(element.id);
      });

      body.appendChild(table);

      function getPhonesDetails(idArray) {
        idArray.forEach(phone => {
          fetch(`${url}/${phone}.json`).then(response => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}`));
            }

            return response.json();
          })

            .then(phoneDetails => phoneDetails)

            .catch(error => error);
        });
      }

      getPhonesDetails(ids);
    })

    .catch((error) => {
      setTimeout(() => {
        const notification = document.createElement('div');

        notification.setAttribute('style', `
        display: flex;
        width: 300px;
        height: 50px;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10%;
        right: 10%;
        background-color: red;
        font-size: 24px;
        font-weight: bold;
        border-radius: 30px;
      `);
        notification.textContent = `ERROR - code ${error}`;
        body.appendChild(notification);
      }, 5000);
    });
}

getPhones();
