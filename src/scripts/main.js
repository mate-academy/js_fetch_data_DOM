'use strict';

const serverURL = 'https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/';
const phonesEndpoint = 'phones.json';
let mobiles = [];

getPhones()
  .then(phones => {
    const phonesIds = phones.map(phone => phone.id);
    const requests = phonesIds.map(phoneId => {
      return fetch(serverURL + `/phones/${phoneId}.json`)
        .then(response => response.json());
    });

    mobiles = phones.map(phone => phone);

    return Promise.all(requests);
  })
  .then(phonesDetails => {
    const phonesList = document.createElement('ul');

    phonesDetails.forEach(phoneDetails => {
      const li = document.createElement('li');

      li.innerText = phoneDetails.name;
      phonesList.append(li);
    });

    document.body.append(phonesList);

    return phonesDetails;
  })
  .then(phonesDetails => {
    phonesDetails.map(phoneDetails => {
      const phone = mobiles.find(mobile => mobile.id === phoneDetails.id);

      return combinePhoneWithDetails(phone, phoneDetails);
    });
  })
  .catch(error => {
    const errorMessage = document.createElement('h1');

    errorMessage.innerText = error.message;
    document.body.append(errorMessage);
  });

function getPhones() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Your request timed out'));
    }, 5000);

    fetch(serverURL + phonesEndpoint)
      .then(response => response.json())
      .then(phones => resolve(phones));
  });
}

function combinePhoneWithDetails(phone, phoneDetails) {
  const phoneWithDetails = {};

  for (const key in phone) {
    phoneWithDetails[key] = phone[key];
  }

  for (const key in phoneDetails) {
    if (!phoneWithDetails.hasOwnProperty(key)) {
      if (typeof phoneDetails[key] === 'object') {
        const copyProperty = deepCopy(phoneDetails[key]);

        phoneWithDetails[key] = copyProperty;
      } else {
        phoneWithDetails[key] = phoneDetails[key];
      }
    }
  }

  return phoneWithDetails;
}

function deepCopy(original) {
  const copy = {};

  for (const key in original) {
    if (typeof original[key] !== 'object') {
      copy[key] = original[key];
    } else {
      const copyProperty = deepCopy(original[key]);

      copy[key] = copyProperty;
    }
  }

  return copy;
}
