'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
     + 'phone-catalogue-static/api/phones.json';
const phonesDetails = 'https://mate-academy.github.io/'
     + 'phone-catalogue-static/api/phones/:phoneId.json';

const ul = document.createElement('ul');

document.body.append(ul);

function getPhones() {
  return fetch(BASE_URL)
    .then(response => response.json())
    .catch(message => {
      setTimeout(() => {
        Error(message);
      }, 5000);
    });
};

getPhones()
  .then(phone => {
    const allPhones = phone.map(phones => phones.id);

    for (const key of phone) {
      const li = document.createElement('li');

      li.innerText = key.name;
      ul.append(li);
    }

    getPhonesDetails(allPhones);
  });

function getPhonesDetails(phoneId) {
  const details = phoneId.map(phones => {
    return fetch(`${phonesDetails}${phones}.json`)
      .then(response => {
        return response.json();
      });
  });

  Promise.all(details);
};
