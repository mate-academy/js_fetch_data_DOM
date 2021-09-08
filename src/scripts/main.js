'use strict';

const url = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';

const detailsURL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/';

const list = document.createElement('ul');

document.body.append(list);

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          alert(`${response.status}`);
        }, 5000);
      }

      return response.json();
    });
}

getPhones()
  .then(phones => {
    const phonesIds = phones.map(phone => phone.id);

    phones.forEach(el => {
      list.insertAdjacentHTML('beforeend', `
        <li>${el.name}</li>
      `);
    });

    getPhonesDetails(phonesIds);
  });

function getPhonesDetails(array) {
  const mappedArray = array.map(phoneId => {
    return fetch(`${detailsURL}` + `${phoneId}.json`)
      .then(response => response.json());
  });

  Promise.allSettled(mappedArray)
    .then(response => {
      response.forEach((result, index) => {
        if (result.status === 'rejected') {
          alert(index);
        }
      });
    });
};
