'use strict';

// eslint-disable-next-line
const ListURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const DetailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const list = document.createElement('ul');

document.body.append(list);

const ul = document.querySelector('ul');

function getPhones() {
  fetch(ListURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.url} is not exist`);
      }

      if (!response.headers.get('content-type')) {
        throw new Error('Content tipe is note supported');
      }

      return response.json();
    })
    .then(data => {
      getPhonesDetails(data);
    })
    .catch(error => {
      setTimeout(() => {
        const li = document.createElement('li');

        li.textContent = error;

        ul.append(li);
      }, 5000);
    });
};

function getPhonesDetails(datafromServer) {
  datafromServer.forEach(phone => {
    const phoneId = phone.id;

    fetch(`${DetailsURL}${phoneId}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Cannot find phone with ${phoneId}`);
        }

        return response.json();
      })
      .then(data => {
        renderList(data);
      })
      .catch(error => {
        const li = document.createElement('li');

        li.textContent = error;

        ul.append(li);
      });

    function renderList(data) {
      const li = document.createElement('li');

      li.textContent = data.name;

      ul.append(li);
    }
  });
}

getPhones();
