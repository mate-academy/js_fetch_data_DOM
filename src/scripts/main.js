'use strict';

const url = 'https://mate-academy.github.io/phone-catalogue-static/';

const phoneSelect = document.querySelector('.phone__select');
const phoneImg = document.querySelector('.phone__image');
const phoneInfo = document.querySelector('.phone__info');

const getPhones = () => {
  return fetch(`${url}api/phones.json`)
    .then(response => {
      if (!response.ok) {
        throw alert(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

const createList = (phones) => {
  phoneImg.src = `${url}${phones[0].imageUrl}`;
  phoneInfo.textContent = phones[0].snippet;

  for (const phone of phones) {
    phoneSelect.insertAdjacentHTML('beforeend', `
      <option data-img="${phone.imageUrl}" data-text="${phone.snippet}">
        ${phone.name}
      </option>
    `);
  }

  return phones;
};

function getPhonesDetails(data) {
  const deviceId = data.map(device => device.id);
  const promiseAll = deviceId.map(id => fetch(`${url}api/phones/${id}.json`));

  return Promise.all(promiseAll);
}

getPhones()
  .then(phones => createList(phones))
  .then(data => getPhonesDetails(data))
  .catch(error => alert(error));

phoneSelect.addEventListener('change', (e) => {
  const item = [...e.target.children]
    .find(phone => phone.textContent.trim() === e.target.value);

  phoneImg.src = `${url}${item.dataset.img}`;
  phoneInfo.textContent = item.dataset.text;
});
