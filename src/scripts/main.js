'use strict';

const baseLink = 'https://mate-academy.github.io/phone-catalogue-static/api/';

const getPhones = (phonesLink) => {
  return fetch(baseLink + phonesLink)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          Promise.reject(new Error());
        }, 5000);
      }

      return response.json();
    })
    .then(phones => phones.map(phone => phone.id));
};

const getPhonesDetails = (url, phonesId) => {
  const phoneDetails = phonesId.map(phoneId => {
    return fetch(baseLink + url + phoneId + '.json')
      .then(response => {
        if (!response.ok) {
          return setTimeout(() => {
            Promise.reject(new Error());
          }, 5000);
        }

        return response.json();
      })
      .catch(new Error());
  });

  return Promise.all(phoneDetails).then(phone => phone);
};

getPhones('phones.json')
  .then(phonesIdArray => getPhonesDetails('phones/', phonesIdArray))
  .then(phoneDetails => phoneDetails)
  .then(phoneDetails => {
    const div = document.createElement('div');

    for (const phone of phoneDetails) {
      div.insertAdjacentHTML('beforeend', `<p>${phone.name}</p>`);
    }

    document.body.append(div);

    const phonesWithDetails = phoneDetails;

    return phonesWithDetails;
  });
