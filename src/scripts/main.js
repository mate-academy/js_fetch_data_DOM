'use strict';

const BASE_URL =
  'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const request = (url = '') => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status} - the endpoint does not exist`)
          );
        }, 5000);
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`Content-type is not application/json`)
          );
        }, 5000);
      }

      return response.json();
    })
    .catch((error) => setTimeout(Promise.reject(new Error(error)), 5000));
};

const getPhones = () => request('.json');

const getPhonesDetails = () => {
  const list = document.createElement('ul');

  getPhones().then((phones) => {
    phones.forEach((phone) => {
      const item = document.createElement('li');

      item.innerText = phone.name;
      list.append(item);
    });
  });

  document.body.append(list);
};

getPhonesDetails();
