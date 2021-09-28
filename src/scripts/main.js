'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const phonesWithDetails = [];
const phonesWithoutDetails = [];
const phonesDetails = [];

const getPhones = () => {
  return fetch(`${BASE_URL}/phones.json`)
    .then(response => {
      if (!response.ok) {
        throw setTimeout(() => {
          alert(`${response.status}`);
        }, 5000);
      }

      return response.json();
    })
    .then(phonesList => {
      const list = document.createElement('ul');

      for (const phone of phonesList) {
        const phoneName = document.createElement('li');

        phoneName.innerText = phone.name;
        list.append(phoneName);
      }

      document.body.append(list);

      return phonesList;
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
      phonesWithoutDetails.push(JSON.parse(JSON.stringify(phone)));
    }

    return phonesWithoutDetails;
  })
  .then(phonesList => getPhonesDetails(phonesList.map(phone => phone.id)))
  .then(details => {
    for (const phone of details) {
      phonesDetails.push(JSON.parse(JSON.stringify(phone)));
    }

    return phonesDetails;
  })
  .then(details => {
    for (let i = 0; i < details.length; i++) {
      phonesWithDetails.push(
        Object.assign(
          {},
          JSON.parse(JSON.stringify(phonesWithoutDetails[i])),
          JSON.parse(JSON.stringify(phonesDetails[i]))
        )
      );
    }
  })
  .catch(() => {});
