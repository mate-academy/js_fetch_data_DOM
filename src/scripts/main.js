'use strict';

const request = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status} - ${response.statusText}`);
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        throw Error('Content-type is not supported');
      }

      return response.json();
    });
};

const storeData = (phone, details, result, container) => {
  const element = document.createElement('p');
  const desc = document.createElement('span');

  result.push({
    ...phone,
    ...details,
  });

  element.innerHTML = result.length + '.) '
    + result[result.length - 1].name;
  desc.innerHTML = JSON.stringify(result[result.length - 1]);
  container.appendChild(element);
  container.append(desc);
};

// Using request
const listURL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const detailsURL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones/';

const getPhones = () => {
  const BASE_URL = listURL;

  return request(BASE_URL);
};

const getPhonesDetails = (phones) => {
  const BASE_URL = detailsURL;
  const container = document.createElement('div');
  const result = [];

  container.classList.add('container');

  for (const phone of phones) {
    request(BASE_URL + phone.id + '.json')
      .then(data => {
        storeData(phone, data, result, container);
      });
  }
  document.body.appendChild(container);

  return result;
};

const resolve = () => {
  const startTime = Date.now();

  getPhones()
    .then(getPhonesDetails)
    .catch(err => {
      if (startTime + 5000 < Date.now()) {
        resolve();
      }

      return Promise.reject(err);
    });
};

window.addEventListener('load', resolve);
