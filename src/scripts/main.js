'use strict';

const listUrl = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const detailsUrl = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/';
const body = document.querySelector('body');
const ul = document.createElement('ul');

body.append(ul);

const getPhones = () => {
  fetch(listUrl)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          throw new Error('ERROR: Fetch failed');
        }
      }, 5000);

      return response.json();
    }).then(phonesList => {
      getPhonesDetails(phonesList);
    });
};

const getPhonesDetails = (phonesList) => {
  for (const phone of phonesList) {
    fetch(detailsUrl + phone.id + '.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`ERROR: Failed to fetch ${phone.id} details`);
        }

        return response.json();
      }).then(phoneEl => {
        const li = document.createElement('li');

        li.innerText = phoneEl.name;
        ul.append(li);
      });
  }
};

getPhones();
