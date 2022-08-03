'use strict';

const body = document.querySelector('body');
const list = document.createElement('ul');
const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const request = () => {
  return fetch(`${BASE_URL}`)
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

const getPhonesDetails = () => {
  request()
    .then(result => {
      result.forEach(item => {
        const listItem = document.createElement('li');

        listItem.innerText = item.name;
        list.append(listItem);
      });
    });

  body.append(list);
};

getPhones();
getPhonesDetails();
