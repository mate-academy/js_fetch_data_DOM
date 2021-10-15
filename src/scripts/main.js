'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const list = document.createElement('ul');

document.body.append(list);

const request = (
  endPoint = '',
) => {
  return fetch(`${BASE_URL}${endPoint}.json`)
    .then(response => {
      if (!response.ok) {
        return new Error('Error with request');
      };

      return response.json();
    });
};

const getPhones = () => {
  return request('/phones');
};

const getPhonesDetails = (id) => {
  return request(`/phones/${id}`);
};

getPhones()
  .then(data => {
    return Promise.all(data.map(el => getPhonesDetails(el.id)));
  })
  .then(phones => {
    phones.forEach(phone => {
      list.insertAdjacentHTML(
        'beforeend',
        `<li>${phone.name}</li>`
      );
    });
  });
