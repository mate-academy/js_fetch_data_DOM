'use strict';

const body = document.querySelector('body');
const ulList = document.createElement('ul');
const url
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const request = () => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      setTimeout(() => error, 5000);
    });
};

const getPhones = () => request();
const getPhonesDetails = () => {
  request()
    .then(result => {
      result.forEach(item => {
        const itemLi = document.createElement('li');

        itemLi.innerText = item.name;
        ulList.append(itemLi);
      });
    });

  body.append(ulList);
};

getPhones();
getPhonesDetails();
