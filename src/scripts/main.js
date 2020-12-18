'use strict';

// Endpoints
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/';

// Methods to work with DOM
function prepareDOM() {
  const msgBlock = document.createElement('div');
  const phonesListBlock = document.createElement('div');

  msgBlock.className = 'message';
  phonesListBlock.className = 'phone-list';

  document.querySelector('.logo').after(msgBlock);
  document.querySelector('.logo').after(phonesListBlock);
}

function showMessage(msg, isResolved) {
  const msgElem = document.createElement('p');

  msgElem.className = isResolved ? 'message-success' : 'message-error';
  msgElem.innerHTML = msg;

  document.querySelector('.message').append(msgElem);
};

function showData(data) {
  const phoneList = document.querySelector('.phone-list');
  const table = document.createElement('table');
  let html = '<tr class="phone-list-row"><th>Name</th>'
    + '<th>Android OS</th><th>CPU</th><th>Battery</th><th>Image</th></tr>';

  [...data].forEach(item => {
    html += `<tr class="phone-list-row">
      <td>${item.name}</td>
      <td>${item.os}</td>
      <td>${item.cpu}</td>
      <td>${item.battery}</td>
      <td><img src="${item.image}" alt="${BASE_URL + item.image}"></td>
    </tr>`;
  });

  table.className = 'phone-list-table';
  table.innerHTML = html;
  phoneList.append(table);
}

// Define methods to do requests
const request = (url) => {
  return fetch(BASE_URL + url)
    .then(result => {
      if (!result.ok) {
        setTimeout(() => {
          Promise.reject(new Error(`${result.status}`))
            .catch(err => showMessage('err:' + err, false));
        }, 5000);
      }

      if (!result.headers.get('content-type').includes('application/json')) {
        return Promise.reject(new Error('Inapropriate Content-Type'));
      }

      return result.json();
    });
};

const getPhones = () => request('phones.json');
const getPhonesDetails = (id) => request(`phones/${id}.json`);

// Manipulate requested data and display it
const phonesWithDetails = [];

prepareDOM();

const phoneWithDetails = () => {
  return getPhones()
    .then(result => {
      return Promise.all(
        result.map(phone => getPhonesDetails(phone.id)
          .then(data => Object.assign({},
            { name: data.name },
            { os: data.android.os },
            { cpu: data.hardware.cpu },
            { battery: `${data.battery.talkTime}, ${data.battery.type}` },
            { image: Array.isArray(data.images) ? data.images[0] : '' }
          ))));
    });
};

phoneWithDetails()
  .then(data => {
    phonesWithDetails.push(data);
    showData(data);
  })
  .catch(err => {
    showMessage('err:' + err, false);
  });
