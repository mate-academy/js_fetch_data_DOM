'use strict';

const baseURL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

const getData = (url) => {
  const fetchResponse = fetch(url, { signal: controller.signal })
    .then((response) => {
      if (!response.ok) {
        Promise.reject(Error(`${response.status} - ${response.statusText}`));
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        Promise.reject(Error('Content-type is not JSON'));
      }

      clearTimeout(timeoutId);

      return response.json();
    });

  return fetchResponse;
};

getData(`${baseURL}/phones.json`).then(result => {
  const phonesIDs = result.map(phone => phone.id);

  getPhonesDetails(phonesIDs);
});

const getPhonesDetails = (IDsOfPhones) => {
  IDsOfPhones.forEach(phoneID => {
    getData(`${baseURL}/phones/${phoneID}.json`)
      .then(result => {
        const pTag = document.createElement('p');
        const phoneName = document.createTextNode(result.name);

        pTag.appendChild(phoneName);
        document.getElementById('data').appendChild(pTag);
      });
  });
};
