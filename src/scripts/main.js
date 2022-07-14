'use strict';

/* eslint-disable-next-line */
const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const request = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(Error('Somethin went erong'));
      }

      return response.json();
    });
};

const getPhones = () => {
  return request();
};

const getPhonesDetails = () => {
  return request()
    .then(item => {
      const arrOfNames = [];

      item.map(el => arrOfNames.push(el.name));

      const div = document.createElement('div');
      const ul = document.createElement('ul');

      div.appendChild(ul);

      arrOfNames.forEach(el => ul.insertAdjacentHTML('afterbegin',
        `<li>${el}</li>`,
      ));

      document.body.appendChild(div);
    });
};

getPhones();
getPhonesDetails();
