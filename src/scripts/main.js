'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const list = document.createElement('ul');
const phonesWithDetails = [];

const getPhones = () => {
  return fetch(`${BASE_URL}/phones.json`)
    .then(response => {
      if (!response.ok) {
        throw setTimeout(() => {
          alert(`${response.status}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (phonesId) => {
  const requests = phonesId.map(id => fetch(`${BASE_URL}/phones/${id}.json`));

  return Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .catch(() => {
      throw alert(Error('Error on load details'));
    });
};

getPhones()
  .then(phonesList => {
    for (const phone of phonesList) {
      const phoneName = document.createElement('li');

      phoneName.innerText = phone.name;
      list.append(phoneName);
    }

    return phonesList;
  })
  .then(phonesList => {
    const details = getPhonesDetails(phonesList.map(phone => phone.id));

    for (let i = 0; i < phonesList.length; i++) {
      phonesWithDetails.push(JSON.parse(JSON.stringify(phonesList[i])));
    }

    return details;
  })
  .then(details => {
    for (let i = 0; i < details.length; i++) {
      phonesWithDetails[i].details = JSON.parse(JSON.stringify(details[i]));
    }
  })
  .catch(() => {});

document.body.append(list);
