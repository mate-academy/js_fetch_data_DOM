'use strict';

const BASE = 'https://mate-academy.github.io/'
    + 'phone-catalogue-static/api/phones.json';
const url = 'https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/phones/';
const body = document.querySelector('body');
const ul = document.createElement('ul');

body.append(ul);

const getPhones = () => {
  fetch(BASE)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          throw new Error('Fetch failed');
        }
      }, 5000);

      return response.json();
    })
    .then(phonesList => {
      getPhonesDetails(phonesList);
    });
};

const getPhonesDetails = (data) => {
  data.map(el =>
    fetch(url + el.id + '.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${el.id} details`);
        }

        return response.json();
      })
      .then(res => {
        const li = document.createElement('li');

        li.innerText = res.name;
        ul.append(li);
      })
  );
};

getPhones();
