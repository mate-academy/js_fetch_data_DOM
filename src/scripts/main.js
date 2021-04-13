'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/';

function request(endpoint) {
  return fetch(`${BASE_URL}${endpoint}`).then(response => response.json());
}

const getPhones = () => {
  const result = new Promise((resolve, reject) => {
    setTimeout(() => reject, 5000);

    return resolve(request(`phones.json`));
  });

  return result;
};

const getPhoneDetails = (ids) => {
  const result = Promise.all(ids.map(id => {
    return new Promise((resolve) => {
      return resolve(request(`phones/${id}.json`));
    });
  }));

  return result;
};

getPhones().then(response => {
  for (const phone of response) {
    document.querySelector('body').append(phone.name);
  }
});

getPhones().then(response => getPhoneDetails(response.map(phone => phone.id)));
