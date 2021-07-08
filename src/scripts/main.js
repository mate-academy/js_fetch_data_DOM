'use strict';

const serverURL = 'https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/';
const phonesEndpoint = 'phones.json';
const phones = getPhones();

phones
  .then(mobilePhones => {
    const phonesList = document.createElement('ul');

    const phoneIds = mobilePhones.map(phone => {
      const phoneName = document.createElement('li');

      phoneName.innerText = phone.name;
      phonesList.append(phoneName);

      return phone.id;
    });

    document.body.append(phonesList);

    const phonesDetailsRequest = getPhonesDetails(phoneIds);

    Promise.all(phonesDetailsRequest)
      .then(phonesDetails => {
        const phonesWithDetails
        = combinePhonesWithDetails(mobilePhones, phonesDetails);

        const combinedList = document.createElement('ul');

        for (const combinedPhone of phonesWithDetails) {
          const li = document.createElement('li');

          li.innerText = combinedPhone.name;
          combinedList.append(li);
        }

        document.body.append(combinedList);
      })
      .catch(error => {
        pushError(error);
      });
  })
  .catch(error => {
    pushError(error);
  });

function pushError(error) {
  const errorNotification = document.createElement('h1');

  errorNotification.innerText = error.message;
  document.body.append(errorNotification);
}

function combinePhonesWithDetails(phonesToCombine, phonesDetails) {
  const phonesWithDetails = [];

  phonesToCombine.forEach(phone => {
    const phoneDetails = phonesDetails
      .find(details => details.id === phone.id);

    phonesWithDetails.push(combinePhoneWithDetails(phone, phoneDetails));
  });

  return phonesWithDetails;
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

function request(url, endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Your request is timed out'));
    }, 5000);

    fetch(`${url}${endpoint}`)
      .then(response => {
        if (!response.ok) {
          reject(new Error(`${response.status} - ${response.statusText}`));
        }

        return response.json();
      })
      .then(result => resolve(result));
  });
}

function getPhones() {
  return request(serverURL, phonesEndpoint);
}

function getPhonesDetails(phonesIds) {
  return phonesIds.map(phoneId => {
    return fetch(serverURL + `phones/${phoneId}.json`)
      .then(response => response.json());
  });
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
