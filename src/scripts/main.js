'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const PHONES_EP = '/phones.json';
const PHONE_DETAILS_EP = '/phones/';

const request = endpoint => {
  return fetch(BASE_URL + endpoint)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          Error(`Failed to make request at ${BASE_URL + endpoint}`)
        );
      }

      return response.json();
    });
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(Error('5 seconds has passed')), 5000);

    return resolve(request(PHONES_EP));
  });
};

const getPhonesDetails = (ids) => {
  const phones = ids.map(id => request(PHONE_DETAILS_EP + id + '.json'));

  return Promise.all(phones);
};

const displayPhones = (phones) => {
  const phoneList = `
    <ul class="phone-list">
      ${phones.map(phone => `<li>${phone.name}</li>`).join('')}
    </ul>
  `;

  document.body.insertAdjacentHTML('beforeend', phoneList);
};

getPhones()
  .then(data => {
    const ids = data.map(({ id }) => id);

    return getPhonesDetails(ids);
  })
  .then(phones => {
    displayPhones(phones);
  })
  .catch(error => alert(error));
